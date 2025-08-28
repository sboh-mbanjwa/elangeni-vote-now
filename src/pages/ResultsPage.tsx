import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Trophy, Users, TrendingUp, Download, Home, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import elangeniLogo from '@/assets/elangeni-logo.png';
import { positions } from '@/lib/mockData';

const ResultsPage = () => {
  const navigate = useNavigate();

  // Mock final results
  const finalResults = [
    { 
      position: 'SRC President', 
      winner: 'Thabo Mthembu',
      votes: 723,
      totalVotes: 1247,
      percentage: 58.0,
      candidates: [
        { name: 'Thabo Mthembu', votes: 723, percentage: 58.0 },
        { name: 'Mandla Ngcobo', votes: 524, percentage: 42.0 }
      ]
    },
    { 
      position: 'SRC Secretary', 
      winner: 'Nomsa Dlamini',
      votes: 681,
      totalVotes: 1247,
      percentage: 54.6,
      candidates: [
        { name: 'Nomsa Dlamini', votes: 681, percentage: 54.6 },
        { name: 'Zanele Khumalo', votes: 566, percentage: 45.4 }
      ]
    },
    { 
      position: 'SRC Treasurer', 
      winner: 'Sipho Mazibuko',
      votes: 1247,
      totalVotes: 1247,
      percentage: 100.0,
      candidates: [
        { name: 'Sipho Mazibuko', votes: 1247, percentage: 100.0 }
      ]
    }
  ];

  const totalVoters = 1247;
  const totalVotes = 1247;
  const turnoutPercentage = (totalVotes / totalVoters) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="bg-gradient-voting shadow-lg">
        <div className="container mx-auto px-4 py-6 text-center">
          <img src={elangeniLogo} alt="Elangeni TVET" className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-primary-foreground">SRC Election Results 2024</h1>
          <p className="text-lg text-primary-foreground/80">Official Results - Elangeni TVET College</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Election Summary */}
        <Card className="shadow-voting mb-8 bg-gradient-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <Trophy className="h-8 w-8 text-secondary" />
              Election Summary
            </CardTitle>
            <CardDescription className="text-lg">
              Democratic process completed successfully
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3 text-center">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  <span className="text-3xl font-bold">{totalVoters.toLocaleString()}</span>
                </div>
                <p className="text-muted-foreground">Eligible Students</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-6 w-6 text-success" />
                  <span className="text-3xl font-bold">{totalVotes.toLocaleString()}</span>
                </div>
                <p className="text-muted-foreground">Votes Cast</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Trophy className="h-6 w-6 text-secondary" />
                  <span className="text-3xl font-bold">{turnoutPercentage.toFixed(1)}%</span>
                </div>
                <p className="text-muted-foreground">Turnout Rate</p>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Results declared on March 1, 2024 at 18:00</span>
            </div>
          </CardContent>
        </Card>

        {/* Winners Announcement */}
        <Card className="shadow-voting mb-8 border-success/20 bg-success/5">
          <CardHeader>
            <CardTitle className="text-2xl text-success flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              Elected Representatives
            </CardTitle>
            <CardDescription>
              Congratulations to the newly elected SRC members!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {finalResults.map((result) => (
                <div key={result.position} className="flex items-center justify-between p-4 bg-background rounded-lg border border-success/20">
                  <div>
                    <h3 className="font-semibold text-lg">{result.position}</h3>
                    <p className="text-muted-foreground">{result.winner}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-success text-success-foreground">
                      ELECTED
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.votes} votes ({result.percentage.toFixed(1)}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Detailed Results</h2>
          
          {finalResults.map((result) => (
            <Card key={result.position} className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {result.position}
                  <Badge variant="outline">
                    {result.totalVotes.toLocaleString()} total votes
                  </Badge>
                </CardTitle>
                <CardDescription>
                  All candidates and their vote counts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {result.candidates
                    .sort((a, b) => b.votes - a.votes)
                    .map((candidate, index) => (
                      <div key={candidate.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {index === 0 && (
                              <Trophy className="h-5 w-5 text-secondary" />
                            )}
                            <div>
                              <p className="font-semibold">{candidate.name}</p>
                              {index === 0 && (
                                <Badge className="bg-success text-success-foreground text-xs">
                                  WINNER
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{candidate.votes.toLocaleString()} votes</p>
                            <p className="text-sm text-muted-foreground">
                              {candidate.percentage.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                        <Progress 
                          value={candidate.percentage} 
                          className="h-3"
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Election Integrity Notice */}
        <Card className="shadow-card mt-8 bg-info/5 border-info/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-info mb-2">Election Integrity</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All votes were cast securely and anonymously</li>
              <li>• Election was monitored by independent observers</li>
              <li>• Results have been audited and verified</li>
              <li>• No irregularities were reported during the process</li>
              <li>• Appeals period: 48 hours from result announcement</li>
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => window.print()}
          >
            <Download className="h-4 w-4 mr-2" />
            Print Results
          </Button>
          <Button 
            className="flex-1 bg-gradient-voting shadow-button"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;