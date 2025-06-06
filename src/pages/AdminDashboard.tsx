
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Edit, Copy, ExternalLink, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [guests, setGuests] = useState([
    { id: "1", name: "Rajesh Patel", email: "rajesh@example.com", status: "pending", guestCount: 0 },
    { id: "2", name: "Priya Shah", email: "priya@example.com", status: "attending", guestCount: 3 },
    { id: "3", name: "Amit Kumar", email: "amit@example.com", status: "not-attending", guestCount: 0 },
  ]);

  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestEmail, setNewGuestEmail] = useState("");
  const [nextGuestId, setNextGuestId] = useState(4); // Start from 4 since we have guests 1-3

  const addGuest = () => {
    if (newGuestName && newGuestEmail) {
      const newGuest = {
        id: nextGuestId.toString(),
        name: newGuestName,
        email: newGuestEmail,
        status: "pending",
        guestCount: 0
      };
      setGuests([...guests, newGuest]);
      setNextGuestId(nextGuestId + 1);
      setNewGuestName("");
      setNewGuestEmail("");
      toast({
        title: "Guest Added Successfully! 🎉",
        description: `${newGuestName} has been added to the guest list.`,
      });
    }
  };

  const generateRSVPLink = (guestId: string) => {
    // Use the current window location to ensure we get the correct domain
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.includes('lovable.app') 
      ? window.location.origin 
      : window.location.origin;
    return `${baseUrl}/rsvp/${guestId}`;
  };

  const copyRSVPLink = async (guestId: string, guestName: string) => {
    const link = generateRSVPLink(guestId);
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: "Link Copied! 📋",
        description: `RSVP link for ${guestName} has been copied to clipboard.`,
      });
    } catch (err) {
      console.error('Failed to copy link:', err);
      toast({
        title: "Copy Failed",
        description: "Please manually copy the link from the address bar.",
        variant: "destructive",
      });
    }
  };

  const openRSVPLink = (guestId: string) => {
    const link = generateRSVPLink(guestId);
    window.open(link, '_blank');
  };

  // Calculate total attendees
  const totalAttendees = guests.reduce((sum, guest) => {
    return sum + (guest.status === 'attending' ? guest.guestCount + 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-600 to-purple-600 p-6 border-b-4 border-rose-400 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-serif">
            Admin Dashboard
          </h1>
          <Link to="/">
            <Button variant="outline" className="bg-white text-rose-600 hover:bg-rose-50 border-2 border-rose-300">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Total Attendees Card */}
      <div className="max-w-6xl mx-auto p-6">
        <Card className="mb-6 border-4 border-purple-300 shadow-lg bg-gradient-to-r from-purple-100 to-rose-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-4">
              <Users className="w-8 h-8 text-purple-600" />
              <div className="text-center">
                <h2 className="text-3xl font-bold text-purple-800">{totalAttendees}</h2>
                <p className="text-lg text-purple-600 font-medium">Total People Attending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="guests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-rose-300 shadow-md">
            <TabsTrigger value="guests" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              Guest Management
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              Website Content
            </TabsTrigger>
            <TabsTrigger value="emails" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="responses" className="data-[state=active]:bg-rose-500 data-[state=active]:text-white">
              RSVP Responses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guests" className="space-y-6">
            {/* Add new guest */}
            <Card className="border-4 border-rose-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Add New Guest
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guestName">Guest Name</Label>
                    <Input
                      id="guestName"
                      value={newGuestName}
                      onChange={(e) => setNewGuestName(e.target.value)}
                      placeholder="Enter guest name"
                      className="border-2 border-rose-200 focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guestEmail">Email Address</Label>
                    <Input
                      id="guestEmail"
                      type="email"
                      value={newGuestEmail}
                      onChange={(e) => setNewGuestEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="border-2 border-rose-200 focus:border-rose-500"
                    />
                  </div>
                </div>
                <Button onClick={addGuest} className="bg-rose-600 hover:bg-rose-700">
                  Add Guest
                </Button>
              </CardContent>
            </Card>

            {/* Guest list */}
            <Card className="border-4 border-rose-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                <CardTitle>Guest List ({guests.length} guests)</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {guests.map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between p-4 bg-rose-50 rounded-lg border-2 border-rose-200">
                      <div>
                        <h3 className="font-medium text-purple-800">{guest.name}</h3>
                        <p className="text-sm text-gray-600">{guest.email}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          guest.status === 'attending' ? 'bg-green-100 text-green-800' :
                          guest.status === 'not-attending' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {guest.status === 'attending' ? 'Attending' :
                           guest.status === 'not-attending' ? 'Not Attending' : 'Pending'}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          RSVP Link: /rsvp/{guest.id}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => copyRSVPLink(guest.id, guest.name)}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy Link
                        </Button>
                        <Button
                          onClick={() => openRSVPLink(guest.id)}
                          size="sm"
                          variant="outline"
                          className="border-purple-300 text-purple-600 hover:bg-purple-50"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Test Link
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="border-4 border-rose-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5" />
                  Website Content Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="brideName">Bride Name</Label>
                    <Input id="brideName" placeholder="Enter bride name" className="border-2 border-rose-200" />
                  </div>
                  <div>
                    <Label htmlFor="groomName">Groom Name</Label>
                    <Input id="groomName" placeholder="Enter groom name" className="border-2 border-rose-200" />
                  </div>
                  <div>
                    <Label htmlFor="weddingDate">Wedding Date</Label>
                    <Input id="weddingDate" type="date" className="border-2 border-rose-200" />
                  </div>
                  <div>
                    <Label htmlFor="weddingTime">Wedding Time</Label>
                    <Input id="weddingTime" type="time" className="border-2 border-rose-200" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="venue">Venue Details</Label>
                  <Input id="venue" placeholder="Enter venue address" className="border-2 border-rose-200" />
                </div>
                <Button className="bg-rose-600 hover:bg-rose-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emails" className="space-y-6">
            <Card className="border-4 border-rose-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Template Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">Email template customization will be available here.</p>
                <Button className="bg-rose-600 hover:bg-rose-700">
                  Edit Templates
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses" className="space-y-6">
            <Card className="border-4 border-rose-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                <CardTitle>RSVP Response Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-100 p-4 rounded-lg text-center border-2 border-green-300">
                    <h3 className="text-2xl font-bold text-green-800">
                      {guests.filter(g => g.status === 'attending').length}
                    </h3>
                    <p className="text-green-600">Attending</p>
                  </div>
                  <div className="bg-red-100 p-4 rounded-lg text-center border-2 border-red-300">
                    <h3 className="text-2xl font-bold text-red-800">
                      {guests.filter(g => g.status === 'not-attending').length}
                    </h3>
                    <p className="text-red-600">Not Attending</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg text-center border-2 border-yellow-300">
                    <h3 className="text-2xl font-bold text-yellow-800">
                      {guests.filter(g => g.status === 'pending').length}
                    </h3>
                    <p className="text-yellow-600">Pending</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  Total expected guests: {guests.reduce((sum, guest) => sum + (guest.status === 'attending' ? guest.guestCount + 1 : 0), 0)}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
