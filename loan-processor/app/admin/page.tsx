import { AdminDashboard } from "@/components/AdminDashboard";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Review Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Review and manage flagged loan applications.
        </p>
      </div>
      <AdminDashboard />
    </div>
  );
}
