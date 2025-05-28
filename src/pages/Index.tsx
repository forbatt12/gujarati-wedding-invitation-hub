
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Calendar, Mail } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50">
      {/* Header with traditional border pattern */}
      <div className="bg-gradient-to-r from-rose-600 to-purple-600 p-6 border-b-4 border-gold shadow-lg">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
            🕉️ Wedding RSVP 🕉️
          </h1>
          <p className="text-xl text-rose-100 font-medium">
            A Sacred Celebration of Love and Union
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Wedding details section */}
        <div className="text-center mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-rose-300 max-w-4xl mx-auto relative">
            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-rose-400 rounded-full"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-400 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-rose-400 rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-rose-400 rounded-full"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 font-serif">
              श्री गणेशाय नमः
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-700">
              <div>
                <h3 className="font-bold text-rose-600 mb-2">Bride & Groom</h3>
                <p className="font-medium">Names will be displayed here</p>
              </div>
              <div>
                <h3 className="font-bold text-rose-600 mb-2">Ceremony Date</h3>
                <p className="font-medium">Date will be displayed here</p>
              </div>
              <div>
                <h3 className="font-bold text-rose-600 mb-2">Venue</h3>
                <p className="font-medium">Venue details will be displayed here</p>
              </div>
              <div>
                <h3 className="font-bold text-rose-600 mb-2">Time</h3>
                <p className="font-medium">Ceremony time will be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-rose-100 to-purple-100 border-4 border-rose-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Admin Panel</h3>
              <p className="text-gray-700 mb-6">
                Manage guests, customize content, and view RSVP responses
              </p>
              <Link to="/admin">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 text-lg font-medium rounded-full shadow-lg">
                  Enter Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Guest RSVP</h3>
              <p className="text-gray-700 mb-6">
                Access your personalized RSVP form with your unique link
              </p>
              <div className="text-sm text-gray-600 italic">
                Please use the personalized link sent to you via email
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Traditional blessing */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-rose-600 text-white p-6 rounded-2xl shadow-xl max-w-2xl mx-auto">
            <p className="text-lg font-medium italic">
              "May Lord Ganesha remove all obstacles and bless this sacred union with eternal happiness, prosperity, and love."
            </p>
            <p className="text-2xl mt-4">🙏</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
