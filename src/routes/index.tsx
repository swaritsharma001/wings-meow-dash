import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WINGS MEOWWWW" },
      { name: "description", content: "WINGS MEOWWWW employee dashboard" },
    ],
  }),
  component: Index,
});

type Employee = Record<string, any>;

function decode(pw: string) {
  if (!pw) return "";
  try {
    return atob(pw);
  } catch {
    return pw;
  }
}

function Index() {
  const [q, setQ] = useState("");
  const { data, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const r = await fetch(
        "https://student-database-1882d-default-rtdb.firebaseio.com/employees.json",
      );
      return (await r.json()) as Record<string, Employee>;
    },
  });

  const employees = useMemo(() => {
    if (!data) return [];
    const list = Object.entries(data).map(([id, e]) => ({ id, ...(e as Employee) }));
    const s = q.trim().toLowerCase();
    return s
      ? list.filter((e) => String(e.name ?? "").toLowerCase().includes(s))
      : list;
  }, [data, q]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            WINGS MEOWWWW
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Employee directory
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search WINGS MEOWWWW by name..."
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {isLoading && (
          <p className="text-sm text-muted-foreground">Loading...</p>
        )}
        {error && (
          <p className="text-sm text-destructive">Failed to load employees.</p>
        )}

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-secondary-foreground">
              <tr>
                <th className="px-4 py-3 text-left">Emp ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Designation</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Password</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="border-t border-border">
                  <td className="px-4 py-3 font-mono">{String(e.empId ?? e.id)}</td>
                  <td className="px-4 py-3 font-medium">{e.name}</td>
                  <td className="px-4 py-3">{e.designation}</td>
                  <td className="px-4 py-3">{String(e.phone ?? "")}</td>
                  <td className="px-4 py-3 font-mono text-primary">
                    {decode(e.password)}
                  </td>
                  <td className="px-4 py-3">{e.status}</td>
                </tr>
              ))}
              {!isLoading && employees.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-muted-foreground">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
