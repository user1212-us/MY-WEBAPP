import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { signalSchema, signalDeleteSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";

// Function to check if it's a US stock market working day and hour
/* function isMarketOpen() {
  const now = new Date();
  const day = now.getUTCDay();
  const hour = now.getUTCHours();
  const minute = now.getUTCMinutes();

  // Check if it's Monday to Friday
  if (day >= 1 && day <= 5) {
    // Convert UTC to Eastern Time (ET)
    const etHour = (hour - 4 + 24) % 24; // Adjust for ET (UTC-4)

    // Check if it's between 9:30 AM and 4:00 PM ET
    if ((etHour > 9 || (etHour === 9 && minute >= 30)) && etHour < 16) {
      return true;
    }
  }
  return false;
} */

// Function to fetch current price (replace with your actual API call)
async function fetchCurrentPrice(symbol: string) {
  try {
    const response = await fetch(
      `https://financialmodelingprep.com/api/v3/quote-short/${symbol}?apikey=${process.env.MY_API_KEY}`
    );
    const data = await response.json();
    return data[0].price;
  } catch (error) {
    console.error("Error fetching price:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (session) {
    if (session.user) {
      if (session.user.email) {
        if (session.user.email !== "rashed111222@yahoo.com")
          return new NextResponse("Unauthorized", { status: 401 });
      } else {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }
  }

  try {
    const body = await req.json();

    signalSchema.parse(body);
    const { symbol, enterPrice, firstTarget, secondTarget } = body;

    const client = await pool.connect();
    const query = `
      INSERT INTO signals (symbol, type, enter_price, price_now, first_target, second_target)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const result = await client.query(query, [
      symbol,
      "Buy",
      enterPrice,
      enterPrice,
      firstTarget,
      secondTarget,
    ]);
    client.release();

    // Revalidate the customer-facing signals route
    revalidatePath("/api/signals");

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding signal. error: " + error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (session) {
    if (session.user) {
      console.log(session.user);

      if (session.user.email) {
        if (session.user.email !== "rashed111222@yahoo.com")
          return new NextResponse("Unauthorized", { status: 401 });
      } else {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }
  }

  try {
    const {
      id,
      symbol,
      type,
      enterPrice,
      priceNow,
      firstTarget,
      secondTarget,
    } = await req.json();
    const client = await pool.connect();
    const query = `
      UPDATE signals
      SET symbol = $1, type = $2, enter_price = $3, price_now = $4, first_target = $5, second_target = $6
      WHERE id = $7
      RETURNING *;
    `;
    const result = await client.query(query, [
      symbol,
      type,
      enterPrice,
      priceNow,
      firstTarget,
      secondTarget,
      id,
    ]);
    client.release();
    revalidatePath("/api/signals");

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating signal, error: " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession();

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (session) {
    if (session.user) {
      console.log(session.user);

      if (session.user.email) {
        if (session.user.email !== "rashed111222@yahoo.com")
          return new NextResponse("Unauthorized", { status: 401 });
      } else {
        return new NextResponse("Unauthorized", { status: 401 });
      }
    }
  }

  try {
    const body = await req.json();
    signalDeleteSchema.parse(body);
    const { id, closeSignal } = body;
    const client = await pool.connect();
    const signalResult = await client.query(
      "SELECT * FROM signals WHERE id = $1",
      [id]
    );

    if (signalResult.rowCount === 0) {
      client.release();
      return NextResponse.json({ error: "Signal not found" }, { status: 404 });
    }
    if (closeSignal === "yes") {
      const signal = signalResult.rows[0];
      const historyQuery = `
      INSERT INTO signal_history (symbol, entrance_date, closing_date, in_price, out_price)
      VALUES ($1, $2, CURRENT_DATE, $3, $4);
    `;
      await client.query(historyQuery, [
        signal.symbol,
        signal.date_opened,
        signal.enter_price,
        signal.price_now,
      ]);
    }
    await client.query("DELETE FROM signals WHERE id = $1", [id]);
    client.release();
    revalidatePath("/api/signals");
    revalidatePath("/api/signalHistory");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting signal. Error: " + error },
      { status: 500 }
    );
  }
}

export async function GET() {
  const session = await getServerSession();
  const isAdmin = session?.user?.email === "rashed111222@yahoo.com";

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const client = await pool.connect();
    const query = `SELECT * FROM signals`;
    const result = await client.query(query);
    client.release();

    if (isAdmin) {
      // Update prices and check targets for each signal
      const updatedSignals = await Promise.all(
        result.rows.map(async (signal) => {
          const currentPrice = await fetchCurrentPrice(signal.symbol);
          // Update the price
          const updateQuery = `
                      UPDATE signals
                      SET price_now = $1
                      WHERE id = $2
                      RETURNING *;
                    `;
          const updateResult = await client.query(updateQuery, [
            currentPrice,
            signal.id,
          ]);
          if (currentPrice >= signal.first_target) {
            // Close the signal if first target is reached
            await DELETE(
              new NextRequest(`${process.env.NEXTAUTH_URL}`, {
                method: "DELETE",
                body: JSON.stringify({ id: signal.id, closeSignal: "yes" }),
              })
            );
            return null; // Signal closed, don't include in the response
          } else {
            return updateResult.rows[0];
          }
        })
      );

      // Filter out null values (closed signals)
      const activeSignals = updatedSignals.filter((signal) => signal !== null);
      return NextResponse.json(activeSignals, { status: 200 });
    } else {
      // For non-admin users, just return the signals without updating
      return NextResponse.json(result.rows, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching signals, error: " + error },
      { status: 500 }
    );
  }
}
