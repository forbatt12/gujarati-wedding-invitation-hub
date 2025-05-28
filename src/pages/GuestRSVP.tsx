
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const GuestRSVP = () => {
  const { guestId } = useParams();
  const [guest, setGuest] = useState(null);
  const [attending, setAttending] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock guest data - in real app this would come from backend
  useEffect(() => {
    const mockGuests = {
      "1": { id: "1", name: "Rajesh Patel", email: "rajesh@example.com" },
      "2": { id: "2", name: "Priya Shah", email: "priya@example.com" },
      "3": { id: "3", name: "Amit Kumar", email: "amit@example.com" },
    };
    
    if (guestId && mockGuests[guestId]) {
      setGuest(mockGuests[guestId]);
    }
  }, [guestId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!attending) {
      toast({
        title: "Please select your attendance",
        description: "Let us know if you'll be joining us for the celebration.",
        variant: "destructive",
      });
      return;
    }

    // Here you would normally save to backend
    console.log("RSVP submitted:", {
      guestId,
      attending: attending === "yes",
      guestCount: attending === "yes" ? guestCount : 0,
      message
    });

    setIsSubmitted(true);
    toast({
      title: "RSVP Submitted Successfully! 🎉",
      description: "Thank you for your response. We can't wait to celebrate with you!",
    });
  };

  if (!guest) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto border-4 border-red-300">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Guest Not Found</h2>
            <p className="text-gray-600 mb-6">
              The RSVP link you're using is not valid or has expired.
            </p>
            <Link to="/">
              <Button className="bg-orange-600 hover:bg-orange-700">
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-4 border-orange-300 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center pb-6">
            <div className="mx-auto mb-2 w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center space-y-6">
            <p className="text-xl text-gray-700">
              Your RSVP has been successfully submitted.
            </p>
            <p className="text-gray-600">
              {attending === "yes" 
                ? "We're excited to have you join us for our special day!" 
                : "We're sorry you won't be able to join us, but we appreciate your response."}
            </p>
            <p className="text-sm text-gray-500">
              You can revisit this page at any time to update your response.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)} 
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Update RSVP
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="border-4 border-orange-300 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center">
            <CardTitle className="text-2xl font-serif">Wedding RSVP</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center mb-8 border-b-2 border-orange-200 pb-4">
              <h2 className="text-xl text-red-800 font-medium mb-2">
                Namaste, {guest.name}!
              </h2>
              <p className="text-gray-600">
                We request the pleasure of your company as we celebrate our wedding
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-lg font-medium text-orange-800">
                  Will you be attending the wedding?
                </Label>
                <RadioGroup value={attending} onValueChange={setAttending} className="mt-3 space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="attending-yes" className="border-2 border-orange-300" />
                    <Label htmlFor="attending-yes" className="font-medium">Yes, I'll be there!</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="attending-no" className="border-2 border-orange-300" />
                    <Label htmlFor="attending-no" className="font-medium">No, I cannot attend</Label>
                  </div>
                </RadioGroup>
              </div>

              {attending === "yes" && (
                <div>
                  <Label htmlFor="guestCount" className="text-lg font-medium text-orange-800">
                    Number of guests (including you)
                  </Label>
                  <Input 
                    type="number" 
                    id="guestCount"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                    min={1}
                    max={5}
                    className="mt-2 border-2 border-orange-200"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="message" className="text-lg font-medium text-orange-800">
                  Message for the couple (optional)
                </Label>
                <Textarea 
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your wishes or message..."
                  className="mt-2 border-2 border-orange-200"
                />
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-medium">
                Submit RSVP
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuestRSVP;
