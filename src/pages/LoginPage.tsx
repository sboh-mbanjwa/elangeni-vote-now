import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Vote, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { mockStudents } from '@/lib/mockData';
import elangeniLogo from '@/assets/elangeni-logo.png';
import votingBg from '@/assets/voting-bg.jpg';

const LoginPage = () => {
  const [studentNumber, setStudentNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock validation - In real app, this would validate against college database
    const student = mockStudents.find(s => 
      s.studentNumber === studentNumber && s.idNumber === idNumber
    );

    if (!student) {
      setError('Invalid student number or ID number. Please check your credentials.');
      setIsLoading(false);
      return;
    }

    if (student.hasVoted) {
      setError('You have already voted in this election. Each student can only vote once.');
      setIsLoading(false);
      return;
    }

    // Store student session (in real app, use proper session management)
    localStorage.setItem('votingSession', JSON.stringify({
      studentNumber: student.studentNumber,
      studentName: student.name
    }));

    toast({
      title: "Login Successful",
      description: `Welcome ${student.name}! Redirecting to voting page...`,
    });

    setIsLoading(false);
    navigate('/vote');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${votingBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Card className="w-full max-w-md bg-gradient-card shadow-voting border-0">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <img 
              src={elangeniLogo} 
              alt="Elangeni TVET College" 
              className="h-20 w-20 object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2 justify-center">
            <Vote className="h-6 w-6 text-primary" />
            SRC Elections 2024
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Elangeni TVET College Student Representative Council
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <Alert className="border-destructive/50 text-destructive">
                <ShieldCheck className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="studentNumber">Student Number</Label>
              <Input
                id="studentNumber"
                type="text"
                placeholder="e.g. 2024001"
                value={studentNumber}
                onChange={(e) => setStudentNumber(e.target.value)}
                required
                className="bg-background"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="idNumber">South African ID Number</Label>
              <Input
                id="idNumber"
                type="text"
                placeholder="e.g. 0012251234567"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                required
                className="bg-background"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3">
            <Button 
              type="submit" 
              className="w-full bg-gradient-voting shadow-button hover:shadow-lg transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Login to Vote'
              )}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              By logging in, you agree to participate in the democratic process of SRC elections.
              <br />
              <strong>Demo Credentials:</strong> Student: 2024001, ID: 0012251234567
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;