import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Vote, 
  TrendingUp, 
  Settings, 
  Eye, 
  Download,
  UserCheck,
  Clock,
  BarChart3
} from 'lucide-react';
import elangeniLogo from '@/assets/elangeni-logo.png';
import { positions } from '@/lib/mockData';

const AdminPage = () => {
  const [activeElection, setActiveElection] = useState(true);
  
  // Mock data for demonstration
  const totalStudents = 1247;
  const votedStudents = 892;
  const turnoutPercentage = (votedStudents / totalStudents) * 100;

  const mockResults = [
    { position: 'SRC President', candidate: 'Thabo Mthembu', votes: 523, percentage: 58.6 },
    { position: 'SRC President', candidate: 'Mandla Ngcobo', votes: 369, percentage: 41.4 },
    { position: 'SRC Secretary', candidate: 'Nomsa Dlamini', votes: 487, percentage: 54.6 },
    { position: 'SRC Secretary', candidate: 'Zanele Khumalo', votes: 405, percentage: 45.4 },
    { position: 'SRC Treasurer', candidate: 'Sipho Mazibuko', votes: 892, percentage: 100 },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-gradient-voting shadow-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={elangeniLogo} alt="Elangeni TVET" className="h-10 w-10" />
              <div>
                <h1 className="text-xl font-bold text-primary-foreground">Admin Dashboard</h1>
                <p className="text-sm text-primary-foreground/80">SRC Elections 2024</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success text-success-foreground">
              {activeElection ? 'Election Active' : 'Election Closed'}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="voters">Voters</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Eligible voters</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Votes Cast</CardTitle>
                  <Vote className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{votedStudents.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">Students voted</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Turnout</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{turnoutPercentage.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">Participation rate</p>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Positions</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{positions.length}</div>
                  <p className="text-xs text-muted-foreground">SRC positions</p>
                </CardContent>
              </Card>
            </div>

            {/* Voting Progress */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Voting Progress
                </CardTitle>
                <CardDescription>Real-time voter turnout tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Students Voted: {votedStudents}</span>
                    <span>Remaining: {totalStudents - votedStudents}</span>
                  </div>
                  <Progress value={turnoutPercentage} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {turnoutPercentage.toFixed(1)}% participation rate
                  </p>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3 mt-6">
                  {positions.map((position) => (
                    <div key={position.id} className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-sm">{position.name}</h4>
                      <p className="text-xs text-muted-foreground">{position.candidates.length} candidates</p>
                      <div className="mt-2">
                        <Progress value={turnoutPercentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: '14:32', action: 'Student 2024089 voted', status: 'success' },
                    { time: '14:30', action: 'Student 2024087 voted', status: 'success' },
                    { time: '14:28', action: 'Student 2024085 voted', status: 'success' },
                    { time: '14:25', action: 'Student 2024083 attempted login', status: 'warning' },
                    { time: '14:23', action: 'Student 2024081 voted', status: 'success' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <Badge variant={activity.status === 'success' ? 'default' : 'secondary'} className="w-16 text-xs">
                          {activity.time}
                        </Badge>
                        <span className="text-sm">{activity.action}</span>
                      </div>
                      <UserCheck className={`h-4 w-4 ${activity.status === 'success' ? 'text-success' : 'text-muted-foreground'}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Live Results
                </CardTitle>
                <CardDescription>Current vote counts (updates in real-time)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {positions.map((position) => (
                    <div key={position.id} className="space-y-3">
                      <h3 className="font-semibold text-lg">{position.name}</h3>
                      <div className="space-y-2">
                        {mockResults
                          .filter(result => result.position === position.name)
                          .map((result, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                              <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-medium">{result.candidate}</span>
                                  <div className="text-sm text-muted-foreground">
                                    {result.votes} votes ({result.percentage}%)
                                  </div>
                                </div>
                                <Progress value={result.percentage} className="h-2" />
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voters" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Voter Management
                </CardTitle>
                <CardDescription>Monitor student voting status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Voting Statistics</h4>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                      <div className="text-2xl font-bold text-success">{votedStudents}</div>
                      <p className="text-sm text-muted-foreground">Students have voted</p>
                    </div>
                    <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                      <div className="text-2xl font-bold text-warning">{totalStudents - votedStudents}</div>
                      <p className="text-sm text-muted-foreground">Students haven't voted yet</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Recent Voters</h4>
                    <div className="space-y-2">
                      {[
                        { student: '2024089', name: 'Thandi Mthembu', time: '14:32', status: 'Completed' },
                        { student: '2024087', name: 'John Dlamini', time: '14:30', status: 'Completed' },
                        { student: '2024085', name: 'Sarah Nkomo', time: '14:28', status: 'Completed' },
                        { student: '2024083', name: 'Michael Zulu', time: '14:25', status: 'In Progress' },
                      ].map((voter, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div>
                              <p className="font-medium">{voter.name}</p>
                              <p className="text-sm text-muted-foreground">Student #{voter.student}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">{voter.time}</span>
                            <Badge variant={voter.status === 'Completed' ? 'default' : 'secondary'}>
                              {voter.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Election Settings
                </CardTitle>
                <CardDescription>Manage election configuration and access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Election Status</h4>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span>Voting Active</span>
                      <Badge variant={activeElection ? 'default' : 'secondary'}>
                        {activeElection ? 'ON' : 'OFF'}
                      </Badge>
                    </div>
                    <Button 
                      variant={activeElection ? 'destructive' : 'default'}
                      className="w-full"
                      onClick={() => setActiveElection(!activeElection)}
                    >
                      {activeElection ? 'Close Election' : 'Open Election'}
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Download Full Results
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="h-4 w-4 mr-2" />
                        View Audit Logs
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Export Voter List
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h4 className="font-semibold mb-4">System Information</h4>
                  <div className="grid gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Election Start:</span>
                      <span>2024-03-01 08:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Election End:</span>
                      <span>2024-03-01 17:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Update:</span>
                      <span>2024-03-01 14:32</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;