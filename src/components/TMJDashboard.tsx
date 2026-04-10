import { tmjDataset, getStatistics } from '@/data/tmjDataset';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const COLORS = ['#0088FE', '#FF6B9D', '#00C49F', '#FFBB28', '#FF8042'];

const TMJDashboard = () => {
  const stats = getStatistics();

  const genderData = [
    { name: 'Male', value: stats.maleCount, color: '#0088FE' },
    { name: 'Female', value: stats.femaleCount, color: '#FF6B9D' },
  ];

  const findingsData = [
    { name: 'Osteoarthrosis', value: stats.osteoarthrosisCount, color: '#FF6B6B' },
    { name: 'Osteophyte', value: stats.osteophyteCount, color: '#4ECDC4' },
    { name: 'Healthy', value: stats.total - stats.osteoarthrosisCount, color: '#95E1D3' },
  ];

  const sideData = [
    { name: 'Right TMJ', affected: stats.rightTMJAffected, healthy: stats.total - stats.rightTMJAffected },
    { name: 'Left TMJ', affected: stats.leftTMJAffected, healthy: stats.total - stats.leftTMJAffected },
    { name: 'Bilateral', affected: stats.bilateralAffected, healthy: stats.total - stats.bilateralAffected },
  ];

  const ageData = Object.entries(stats.ageGroups).map(([range, count]) => ({
    range,
    count,
  }));

  const severityData = Object.entries(stats.severityDistribution).map(([severity, count]) => ({
    severity,
    count,
  }));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe': return 'bg-red-500';
      case 'Moderate': return 'bg-orange-500';
      case 'Mild': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            TMJ Panoramic X-Ray Analysis
          </h1>
          <p className="text-slate-400">
            Osteoarthrosis & Osteophyte Dataset Visualization
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Osteoarthrosis Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-400">{stats.osteoarthrosisRate}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Osteophyte Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-cyan-400">{stats.osteophyteRate}%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Average Age</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-400">{stats.averageAge}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Gender Distribution */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Gender Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Findings Distribution */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Findings Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={findingsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {findingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Age Distribution */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Age Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={ageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="range" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* TMJ Side Comparison */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">TMJ Side Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={sideData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="affected" fill="#EF4444" name="Affected" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="healthy" fill="#22C55E" name="Healthy" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Severity Distribution */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Severity Distribution (Total TMJ Joints: {stats.total * 2})</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={severityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="severity" type="category" stroke="#9CA3AF" width={80} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {severityData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.severity === 'Severe' ? '#EF4444' :
                        entry.severity === 'Moderate' ? '#F97316' :
                        entry.severity === 'Mild' ? '#EAB308' : '#22C55E'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Patient Dataset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-96">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">ID</TableHead>
                    <TableHead className="text-slate-300">Age</TableHead>
                    <TableHead className="text-slate-300">Gender</TableHead>
                    <TableHead className="text-slate-300">Right TMJ</TableHead>
                    <TableHead className="text-slate-300">Left TMJ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tmjDataset.map((patient) => (
                    <TableRow key={patient.id} className="border-slate-700">
                      <TableCell className="text-white">{patient.id}</TableCell>
                      <TableCell className="text-white">{patient.age}</TableCell>
                      <TableCell className="text-white">{patient.gender}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {patient.rightTMJ.osteoarthrosis && (
                            <Badge variant="destructive" className="text-xs">OA</Badge>
                          )}
                          {patient.rightTMJ.osteophyte && (
                            <Badge className="bg-cyan-600 text-xs">OP</Badge>
                          )}
                          <Badge className={`text-xs ${getSeverityColor(patient.rightTMJ.severity)}`}>
                            {patient.rightTMJ.severity}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {patient.leftTMJ.osteoarthrosis && (
                            <Badge variant="destructive" className="text-xs">OA</Badge>
                          )}
                          {patient.leftTMJ.osteophyte && (
                            <Badge className="bg-cyan-600 text-xs">OP</Badge>
                          )}
                          <Badge className={`text-xs ${getSeverityColor(patient.leftTMJ.severity)}`}>
                            {patient.leftTMJ.severity}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center text-sm text-slate-400">
          <span><Badge variant="destructive" className="mr-1">OA</Badge> = Osteoarthrosis</span>
          <span><Badge className="bg-cyan-600 mr-1">OP</Badge> = Osteophyte</span>
        </div>
      </div>
    </div>
  );
};

export default TMJDashboard;
