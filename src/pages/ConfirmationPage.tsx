import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, Home, Calendar, Clock, User, Vote } from 'lucide-react';
import elangeniLogo from '@/assets/elangeni-logo.png';
import { positions } from '@/lib/mockData';

const ConfirmationPage = () => {
  const [votingResults, setVotingResults] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const results = localStorage.getItem('votingResults');
    const session = localStorage.getItem('votingSession');
    
    if (!results || !session) {
      navigate('/login');
      return;
    }

    setVotingResults({
      ...JSON.parse(results),
      studentName: JSON.parse(session).studentName,
      studentNumber: JSON.parse(session).studentNumber
    });
  }, [navigate]);

  const handleDownloadReceipt = () => {
    if (!votingResults) return;

    const receiptData = `
ELANGENI TVET COLLEGE - SRC ELECTIONS 2024
VOTING CONFIRMATION RECEIPT
==========================================

Student: ${votingResults.studentName}
Student Number: ${votingResults.studentNumber}
Date: ${new Date(votingResults.timestamp).toLocaleDateString()}
Time: ${new Date(votingResults.timestamp).toLocaleTimeString()}
Confirmation Code: ${votingResults.confirmationCode}

VOTES CAST:
-----------
${votingResults.votes.map((vote: any) => {
  const position = positions.find(p => p.id === vote.positionId);
  const candidate = position?.candidates.find(c => c.id === vote.candidateId);
  return `${position?.name}: ${candidate?.name}`;
}).join('\n')}

==========================================
This receipt confirms your participation in the
SRC Elections. Keep this for your records.

Thank you for voting!
    `;

    const blob = new Blob([receiptData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SRC_Vote_Receipt_${votingResults.confirmationCode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReturnHome = () => {
    // Clear voting session
    localStorage.removeItem('votingSession');
    localStorage.removeItem('votingResults');
    navigate('/');
  };

  if (!votingResults) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/5">
      {/* Header */}
      <header className="bg-gradient-voting shadow-lg">
        <div className="container mx-auto px-4 py-6 text-center">
          <img src={elangeniLogo} alt="Elangeni TVET" className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-primary-foreground">Vote Submitted Successfully!</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Success Message */}
        <Card className="shadow-voting border-success/20 bg-gradient-card mb-6">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
            <CardTitle className="text-2xl text-success">Thank You for Voting!</CardTitle>
            <CardDescription className="text-lg">
              Your vote has been securely recorded for the SRC Elections 2024
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Confirmation Details */}
        <Card className="shadow-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Voting Confirmation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Student Name</p>
                <p className="font-semibold">{votingResults.studentName}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Student Number</p>
                <p className="font-semibold">{votingResults.studentNumber}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(votingResults.timestamp).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{new Date(votingResults.timestamp).toLocaleTimeString()}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Confirmation Code</p>
                <Badge variant="secondary" className="text-lg font-mono px-4 py-2">
                  {votingResults.confirmationCode}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vote Summary */}
        <Card className="shadow-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5 text-primary" />
              Your Votes
            </CardTitle>
            <CardDescription>
              Summary of your selections for each SRC position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {votingResults.votes.map((vote: any) => {
                const position = positions.find(p => p.id === vote.positionId);
                const candidate = position?.candidates.find(c => c.id === vote.candidateId);
                
                return (
                  <div key={vote.positionId} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-semibold">{position?.name}</p>
                      <p className="text-sm text-muted-foreground">{candidate?.name}</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="shadow-card mb-6 bg-info/5 border-info/20">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-info mb-2">Important Notice</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your vote is confidential and cannot be changed</li>
              <li>• Results will be announced after voting closes</li>
              <li>• Keep your confirmation code for verification</li>
              <li>• Contact the Election Committee for any queries</li>
            </ul>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={handleDownloadReceipt}
            variant="outline"
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
          <Button 
            onClick={handleReturnHome}
            className="flex-1 bg-gradient-voting shadow-button"
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;