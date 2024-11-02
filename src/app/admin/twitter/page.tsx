import TwitterPostForm from "@/components/twitterPostForm";

export default function TwitterAdminPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Twitter News Management</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <TwitterPostForm />
      </div>
    </div>
  );
}
