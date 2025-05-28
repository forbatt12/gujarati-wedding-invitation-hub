
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { user, mail, edit, image } from "lucide-react";

const AdminDashboard = () => {
  const [guests, setGuests] = useState([
    { id: "1", name: "Rajesh Patel", email: "rajesh@example.com", status: "pending", guestCount: 0 },
    { id: "2", name: "Priya Shah", email: "priya@example.com", status: "attending", guestCount: 3 },
    { id: "3", name: "Amit Kumar", email: "amit@example.com", status: "not-attending", guestCount: 0 },
  ]);

  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestEmail, setNewGuestEmail] = useState("");

  const addGuest = () => {
    if (newGuestName && newGuestEmail) {
      const newGuest = {
        id: Date.now().toString(),
        name: newGuestName,
        email: newGuestEmail,
        status: "pending",
        guestCount: 0
      };
      setGuests([...guests, newGuest]);
      setNewGuestName("");
      setNewGuestEmail("");
    }
  };

  const generateRSVPLink = (guestId: string) => {
    return `${window.location.origin}/rsvp/${guestId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 p-6 border-b-4 border-yellow-400 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-serif">
            Admin Dashboard
          </h1>
          <Link to="/">
            <Button variant="outline" className="bg-white text-orange-600 hover:bg-orange-50">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs defaultValue="guests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border-2 border-orange-300">
            <TabsTrigger value="guests" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Guest Management
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Website Content
            </TabsTrigger>
            <TabsTrigger value="emails" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Email Templates
            </TabsTrigger>
            <TabsTrigger value="responses" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              RSVP Responses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guests" className="space-y-6">
            {/* Add new guest */}
            <Card className="border-4 border-orange-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <user className="w-5 h-5" />
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
                      className="border-2 border-orange-200 focus:border-orange-500"
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
                      className="border-2 border-orange-200 focus:border-orange-500"
                    />
                  </div>
                </div>
                <Button onClick={addGuest} className="bg-orange-600 hover:bg-orange-700">
                  Add Guest
                </Button>
              </CardContent>
            </Card>

            {/* Guest list */}
            <Card className="border-4 border-orange-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle>Guest List ({guests.length} guests)</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {guests.map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border-2 border-orange-200">
                      <div>
                        <h3 className="font-medium text-red-800">{guest.name}</h3>
                        <p className="text-sm text-gray-600">{guest.email}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          guest.status === 'attending' ? 'bg-green-100 text-green-800' :
                          guest.status === 'not-attending' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {guest.status === 'attending' ? 'Attending' :
                           guest.status === 'not-attending' ? 'Not Attending' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => navigator.clipboard.writeText(generateRSVPLink(guest.id))}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Copy RSVP Link
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card className="border-4 border-orange-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <edit className="w-5 h-5" />
                  Website Content Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="brideName">Bride Name</Label>
                    <Input id="brideName" placeholder="Enter bride name" className="border-2 border-orange-200" />
                  </div>
                  <div>
                    <Label htmlFor="groomName">Groom Name</Label>
                    <Input id="groomName" placeholder="Enter groom name" className="border-2 border-orange-200" />
                  </div>
                  <div>
                    <Label htmlFor="weddingDate">Wedding Date</Label>
                    <Input id="weddingDate" type="date" className="border-2 border-orange-200" />
                  </div>
                  <div>
                    <Label htmlFor="weddingTime">Wedding Time</Label>
                    <Input id="weddingTime" type="time" className="border-2 border-orange-200" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="venue">Venue Details</Label>
                  <Input id="venue" placeholder="Enter venue address" className="border-2 border-orange-200" />
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emails" className="space-y-6">
            <Card className="border-4 border-orange-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <mail className="w-5 h-5" />
                  Email Template Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">Email template customization will be available here.</p>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Edit Templates
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responses" className="space-y-6">
            <Card className="border-4 border-orange-300 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
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
