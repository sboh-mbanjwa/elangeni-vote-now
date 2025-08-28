import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Vote, User, Clock, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { positions } from '@/lib/mockData';
import { Vote as VoteType } from '@/lib/types';
import elangeniLogo from '@/assets/elangeni-logo.png';

const VotingPage = () => {
  const [votes, setVotes] = useState<VoteType[]>([]);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const session = localStorage.getItem('votingSession');
    if (!session) {
      navigate('/login');
      return;
    }
    
    const parsedSession = JSON.parse(session);
    setStudentName(parsedSession.studentName);
  }, [navigate]);

  const handleVoteChange = (positionId: string, candidateId: string) => {
    setVotes(prev => {
      const newVotes = prev.filter(v => v.positionId !== positionId);
      return [...newVotes, { positionId, candidateId }];
    });
  };

  const handleNext = () => {
    const currentPosition = positions[currentPositionIndex];
    const hasVoted = votes.some(v => v.positionId === currentPosition.id);
    
    if (!hasVoted) {
      toast({
        title: "Vote Required",
        description: `Please select a candidate for ${currentPosition.name}`,
        variant: "destructive"
      });
      return;
    }
    
    if (currentPositionIndex < positions.length - 1) {
      setCurrentPositionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPositionIndex > 0) {
      setCurrentPositionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (votes.length !== positions.length) {
      toast({
        title: "Incomplete Ballot",
        description: "Please vote for all positions before submitting",
        variant: "destructive"
      });
      return;
    }

    // Generate confirmation code
    const confirmationCode = `SRC${Date.now().toString().slice(-6)}`;
    
    // Store voting session
    localStorage.setItem('votingResults', JSON.stringify({
      votes,
      timestamp: new Date().toISOString(),
      confirmationCode
    }));

    navigate('/confirmation');
  };

  const handleLogout = () => {
    localStorage.removeItem('votingSession');
    navigate('/login');
  };

  const currentPosition = positions[currentPositionIndex];
  const progress = ((currentPositionIndex + 1) / positions.length) * 100;
  const currentVote = votes.find(v => v.positionId === currentPosition.id);

  if (!currentPosition) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-gradient-voting shadow-lg border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={elangeniLogo} alt="Elangeni TVET" className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">SRC Elections 2024</h1>
              <p className="text-sm text-primary-foreground/80">Welcome, {studentName}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Voting Progress</h2>
            <Badge variant="secondary">
              {currentPositionIndex + 1} of {positions.length}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            Complete all positions to submit your ballot
          </p>
        </div>

        {/* Voting Card */}
        <Card className="shadow-voting">
          <CardHeader className="bg-gradient-card">
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5 text-primary" />
              {currentPosition.name}
            </CardTitle>
            <CardDescription>{currentPosition.description}</CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <RadioGroup
              value={currentVote?.candidateId || ''}
              onValueChange={(candidateId) => handleVoteChange(currentPosition.id, candidateId)}
            >
              <div className="grid gap-6 md:grid-cols-2">
                {currentPosition.candidates.map((candidate) => (
                  <div key={candidate.id} className="space-y-3">
                    <Label
                      htmlFor={candidate.id}
                      className="flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-all duration-200 has-[:checked]:border-primary has-[:checked]:bg-primary/5"
                    >
                      <RadioGroupItem value={candidate.id} id={candidate.id} />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={candidate.photo}
                            alt={candidate.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-border"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{candidate.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              Candidate
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {candidate.manifesto}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {currentVote && (
              <Alert className="mt-6 border-success/50 bg-success/5">
                <CheckCircle className="h-4 w-4 text-success" />
                <AlertDescription className="text-success-foreground">
                  You have selected a candidate for this position. You can change your selection before proceeding.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPositionIndex === 0}
          >
            Previous
          </Button>

          {currentPositionIndex === positions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-voting shadow-button"
              disabled={votes.length !== positions.length}
            >
              Submit Ballot
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-gradient-voting shadow-button"
            >
              Next Position
            </Button>
          )}
        </div>

        {/* Summary */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Voting Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-3">
              {positions.map((position, index) => {
                const vote = votes.find(v => v.positionId === position.id);
                const candidate = vote ? position.candidates.find(c => c.id === vote.candidateId) : null;
                
                return (
                  <div key={position.id} className="flex items-center gap-2 p-2 rounded-md bg-background">
                    {vote ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{position.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {candidate ? candidate.name : 'Not voted'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VotingPage;