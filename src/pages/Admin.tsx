import { useState, useEffect } from "react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Subscriber {
  _id: string;
  email: string;
  subscribedAt: string;
  confirmationSent: boolean;
}

export default function Admin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleAuthenticate = async () => {
    if (!adminSecret.trim()) {
      toast({
        title: "Error",
        description: "Please enter the admin secret",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/subscribers", {
        headers: {
          "x-admin-secret": adminSecret,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();
      setSubscribers(data.subscribers);
      setIsAuthenticated(true);
      toast({
        title: "Success",
        description: `Loaded ${data.count} subscribers`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to authenticate. Check your admin secret.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    try {
      const response = await fetch("/api/admin/subscribers", {
        headers: {
          "x-admin-secret": adminSecret,
        },
      });

      if (!response.ok) {
        throw new Error("Unauthorized");
      }

      const data = await response.json();
      setSubscribers(data.subscribers);
      toast({
        title: "Success",
        description: "Subscribers refreshed",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh subscribers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminSecret("");
    setSubscribers([]);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

          {!isAuthenticated ? (
            <div className="bg-slate-700/50 backdrop-blur border border-slate-600 rounded-lg p-8 max-w-md">
              <h2 className="text-xl font-semibold text-white mb-4">
                Authenticate
              </h2>
              <Input
                type="password"
                placeholder="Enter admin secret"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="mb-4 bg-slate-600 border-slate-500 text-white placeholder:text-slate-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAuthenticate();
                  }
                }}
              />
              <Button
                onClick={handleAuthenticate}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Authenticating..." : "Authenticate"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Subscribers ({subscribers.length})
                  </h2>
                  <p className="text-slate-300 text-sm mt-1">
                    Total launch list members
                  </p>
                </div>
                <div className="space-x-3">
                  <Button
                    onClick={handleRefresh}
                    disabled={loading}
                    variant="outline"
                    className="border-slate-500 text-white hover:bg-slate-600"
                  >
                    {loading ? "Refreshing..." : "Refresh"}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-950"
                  >
                    Logout
                  </Button>
                </div>
              </div>

              <div className="bg-slate-700/50 backdrop-blur border border-slate-600 rounded-lg overflow-hidden">
                {subscribers.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-slate-300">
                      No subscribers yet. Launch list is empty.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-600 hover:bg-transparent">
                        <TableHead className="text-slate-300">Email</TableHead>
                        <TableHead className="text-slate-300">
                          Subscribed At
                        </TableHead>
                        <TableHead className="text-slate-300 text-center">
                          Confirmation Sent
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscribers.map((subscriber) => (
                        <TableRow
                          key={subscriber._id}
                          className="border-slate-600 hover:bg-slate-600/30"
                        >
                          <TableCell className="text-slate-100">
                            {subscriber.email}
                          </TableCell>
                          <TableCell className="text-slate-300">
                            {formatDate(subscriber.subscribedAt)}
                          </TableCell>
                          <TableCell className="text-center">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                subscriber.confirmationSent
                                  ? "bg-green-900/30 text-green-300"
                                  : "bg-yellow-900/30 text-yellow-300"
                              }`}
                            >
                              {subscriber.confirmationSent ? "✓ Sent" : "Pending"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>

              <div className="bg-slate-700/50 backdrop-blur border border-slate-600 rounded-lg p-4 text-sm text-slate-300">
                <p>
                  💡 <strong>Tip:</strong> Export this data for email campaigns or
                  analytics integration.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
