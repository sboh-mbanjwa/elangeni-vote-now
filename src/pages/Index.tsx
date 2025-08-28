import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Vote, Users, Shield, Clock, CheckCircle, BarChart3 } from 'lucide-react';
import elangeniLogo from '@/assets/elangeni-logo.png';
import votingBg from '@/assets/voting-bg.jpg';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${votingBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <div className="flex justify-center mb-8">
            <img 
              src={elangeniLogo} 
              alt="Elangeni TVET College" 
              className="h-32 w-32 object-contain"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-sa bg-clip-text text-transparent">
            SRC Elections 2024
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Elangeni TVET College Student Representative Council
          </p>
          
          <p className="text-lg mb-12 text-white/80 max-w-2xl mx-auto">
            Your voice matters. Participate in the democratic process and elect your student representatives.
            Secure, transparent, and accessible voting for all registered students.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button 
              size="lg"
              className="bg-gradient-voting shadow-button hover:shadow-lg transition-all duration-300"
              onClick={() => navigate('/login')}
            >
              <Vote className="mr-2 h-5 w-5" />
              Cast Your Vote
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate('/results')}
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Results
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Vote Online?</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="shadow-card">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Secure & Transparent</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Your vote is encrypted and securely stored. Full audit trail ensures election integrity and transparency.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Easy Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Vote from anywhere on campus or at home. Mobile-friendly interface works on any device.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Real-time Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get instant confirmation of your vote and view results immediately after voting closes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Vote Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How to Vote</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold">Login</h3>
              <p className="text-sm text-muted-foreground">
                Use your student number and SA ID number to log in securely
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold">Choose</h3>
              <p className="text-sm text-muted-foreground">
                Select your preferred candidates for each SRC position
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold">Submit</h3>
              <p className="text-sm text-muted-foreground">
                Review your choices and submit your ballot securely
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-success/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-semibold">Confirmed</h3>
              <p className="text-sm text-muted-foreground">
                Get your confirmation receipt and voting is complete
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-voting text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Your Voice Heard?</h2>
          <p className="text-lg mb-8 text-white/90">
            Join your fellow students in shaping the future of Elangeni TVET College
          </p>
          
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 shadow-button"
            onClick={() => navigate('/login')}
          >
            <Vote className="mr-2 h-5 w-5" />
            Start Voting Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-muted border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src={elangeniLogo} alt="Elangeni TVET" className="h-8 w-8" />
              <span className="text-sm text-muted-foreground">
                © 2024 Elangeni TVET College. All rights reserved.
              </span>
            </div>
            
            <div className="flex gap-6 text-sm">
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
                Admin Panel
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/results')}>
                Election Results
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
