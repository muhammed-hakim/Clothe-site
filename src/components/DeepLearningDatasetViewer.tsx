import { useState } from 'react';
import {
  tmjDeepLearningDataset,
  toCSV,
  toCOCO,
  toYOLO,
  getDatasetStats,
  CATEGORIES,
  SEVERITY_LABELS,
} from '@/data/deepLearningDataset';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
import { Download, Database, FileJson, FileText, Box } from 'lucide-react';

const COLORS = ['#22C55E', '#EF4444', '#3B82F6', '#A855F7'];

const DeepLearningDatasetViewer = () => {
  const stats = getDatasetStats();
  const [activeFormat, setActiveFormat] = useState<'csv' | 'coco' | 'yolo'>('csv');

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownload = (format: 'csv' | 'coco' | 'yolo') => {
    if (format === 'csv') {
      downloadFile(toCSV(), 'tmj_dataset_labels.csv', 'text/csv');
    } else if (format === 'coco') {
      downloadFile(JSON.stringify(toCOCO(), null, 2), 'tmj_coco_annotations.json', 'application/json');
    } else {
      const yoloData = toYOLO();
      // Download as a single file with all annotations
      const content = yoloData.map(d => `# ${d.filename}\n${d.content}`).join('\n\n');
      downloadFile(content, 'tmj_yolo_annotations.txt', 'text/plain');
    }
  };

  const splitData = [
    { name: 'Train', value: stats.train.total, color: '#3B82F6' },
    { name: 'Validation', value: stats.val.total, color: '#22C55E' },
    { name: 'Test', value: stats.test.total, color: '#F59E0B' },
  ];

  const categoryDistribution = CATEGORIES.map((cat, idx) => ({
    name: cat.name.replace(/_/g, ' '),
    count: tmjDeepLearningDataset.reduce((sum, d) => 
      sum + d.annotations.filter(a => a.category_id === cat.id).length, 0
    ),
    color: COLORS[idx],
  }));

  const pathologyByAge = [
    { 
      range: '20-35', 
      healthy: tmjDeepLearningDataset.filter(d => d.age >= 20 && d.age <= 35 && d.labels.has_pathology === 0).length,
      pathology: tmjDeepLearningDataset.filter(d => d.age >= 20 && d.age <= 35 && d.labels.has_pathology === 1).length,
    },
    { 
      range: '36-50', 
      healthy: tmjDeepLearningDataset.filter(d => d.age >= 36 && d.age <= 50 && d.labels.has_pathology === 0).length,
      pathology: tmjDeepLearningDataset.filter(d => d.age >= 36 && d.age <= 50 && d.labels.has_pathology === 1).length,
    },
    { 
      range: '51-65', 
      healthy: tmjDeepLearningDataset.filter(d => d.age >= 51 && d.age <= 65 && d.labels.has_pathology === 0).length,
      pathology: tmjDeepLearningDataset.filter(d => d.age >= 51 && d.age <= 65 && d.labels.has_pathology === 1).length,
    },
    { 
      range: '66+', 
      healthy: tmjDeepLearningDataset.filter(d => d.age >= 66 && d.labels.has_pathology === 0).length,
      pathology: tmjDeepLearningDataset.filter(d => d.age >= 66 && d.labels.has_pathology === 1).length,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Database className="w-10 h-10 text-blue-400" />
            TMJ Deep Learning Dataset
          </h1>
          <p className="text-slate-400">
            Panoramic X-ray Dataset for Osteoarthritis/Osteophyte Detection
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Total Images</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Train Set</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">{stats.train.total}</p>
              <p className="text-xs text-slate-500">70%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">{stats.val.total}</p>
              <p className="text-xs text-slate-500">15%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Test Set</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-400">{stats.test.total}</p>
              <p className="text-xs text-slate-500">15%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-slate-400">Image Size</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold text-cyan-400">
                {stats.image_dimensions.width}×{stats.image_dimensions.height}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Download Buttons */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Dataset
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => handleDownload('csv')}
                className="bg-green-600 hover:bg-green-700"
              >
                <FileText className="w-4 h-4 mr-2" />
                Download CSV (Classification)
              </Button>
              <Button 
                onClick={() => handleDownload('coco')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <FileJson className="w-4 h-4 mr-2" />
                Download COCO JSON (Detection)
              </Button>
              <Button 
                onClick={() => handleDownload('yolo')}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Box className="w-4 h-4 mr-2" />
                Download YOLO Format (Detection)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Split Distribution */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Train/Val/Test Split</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={splitData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {splitData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Annotation Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" angle={-20} textAnchor="end" height={80} />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Pathology by Age */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Pathology Distribution by Age Group</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pathologyByAge}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="range" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Legend />
                <Bar dataKey="healthy" fill="#22C55E" name="Healthy" stackId="a" />
                <Bar dataKey="pathology" fill="#EF4444" name="With Pathology" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Data Formats */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Data Format Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="csv" className="w-full">
              <TabsList className="bg-slate-700">
                <TabsTrigger value="csv">CSV Format</TabsTrigger>
                <TabsTrigger value="coco">COCO JSON</TabsTrigger>
                <TabsTrigger value="yolo">YOLO Format</TabsTrigger>
              </TabsList>
              
              <TabsContent value="csv" className="mt-4">
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-xs text-green-400">
{toCSV().split('\n').slice(0, 6).join('\n')}
...
                </pre>
              </TabsContent>
              
              <TabsContent value="coco" className="mt-4">
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-xs text-blue-400 max-h-64">
{JSON.stringify(toCOCO(), null, 2).slice(0, 1500)}...
                </pre>
              </TabsContent>
              
              <TabsContent value="yolo" className="mt-4">
                <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-xs text-purple-400">
{`# YOLO Format: class_id x_center y_center width height (normalized)
# Example annotations:
${toYOLO().slice(0, 3).map(d => `# ${d.filename}\n${d.content}`).join('\n\n')}`}
                </pre>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Sample Data Table */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Sample Annotations (First 20)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto max-h-96">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Image ID</TableHead>
                    <TableHead className="text-slate-300">Split</TableHead>
                    <TableHead className="text-slate-300">Age/Gender</TableHead>
                    <TableHead className="text-slate-300">Right TMJ</TableHead>
                    <TableHead className="text-slate-300">Left TMJ</TableHead>
                    <TableHead className="text-slate-300">BBox (Right)</TableHead>
                    <TableHead className="text-slate-300">BBox (Left)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tmjDeepLearningDataset.slice(0, 20).map((d) => (
                    <TableRow key={d.image_id} className="border-slate-700">
                      <TableCell className="text-white font-mono text-sm">{d.image_id}</TableCell>
                      <TableCell>
                        <Badge className={
                          d.split === 'train' ? 'bg-blue-600' :
                          d.split === 'val' ? 'bg-green-600' : 'bg-amber-600'
                        }>
                          {d.split}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">{d.age}/{d.gender}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {d.labels.right_tmj.osteoarthritis === 1 && (
                            <Badge variant="destructive" className="text-xs">OA</Badge>
                          )}
                          {d.labels.right_tmj.osteophyte === 1 && (
                            <Badge className="bg-cyan-600 text-xs">OP</Badge>
                          )}
                          <Badge className={`text-xs ${
                            d.labels.right_tmj.severity === 3 ? 'bg-red-500' :
                            d.labels.right_tmj.severity === 2 ? 'bg-orange-500' :
                            d.labels.right_tmj.severity === 1 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}>
                            {SEVERITY_LABELS[d.labels.right_tmj.severity]}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {d.labels.left_tmj.osteoarthritis === 1 && (
                            <Badge variant="destructive" className="text-xs">OA</Badge>
                          )}
                          {d.labels.left_tmj.osteophyte === 1 && (
                            <Badge className="bg-cyan-600 text-xs">OP</Badge>
                          )}
                          <Badge className={`text-xs ${
                            d.labels.left_tmj.severity === 3 ? 'bg-red-500' :
                            d.labels.left_tmj.severity === 2 ? 'bg-orange-500' :
                            d.labels.left_tmj.severity === 1 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}>
                            {SEVERITY_LABELS[d.labels.left_tmj.severity]}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-400 font-mono text-xs">
                        {d.annotations[0]?.bbox.map(v => Math.round(v)).join(', ')}
                      </TableCell>
                      <TableCell className="text-slate-400 font-mono text-xs">
                        {d.annotations[1]?.bbox.map(v => Math.round(v)).join(', ')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">📘 How to Use This Dataset</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">For Classification (CNN, ResNet, VGG):</h4>
              <p className="text-sm">Use the CSV file with binary labels (<code className="bg-slate-700 px-1 rounded">has_pathology</code>) or multi-class labels (<code className="bg-slate-700 px-1 rounded">severity</code>).</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">For Object Detection (YOLO, Faster R-CNN):</h4>
              <p className="text-sm">Use COCO JSON or YOLO format. Bounding boxes mark TMJ regions with category labels.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Categories:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {CATEGORIES.map((cat, idx) => (
                  <Badge key={cat.id} style={{ backgroundColor: COLORS[idx] }}>
                    {cat.id}: {cat.name.replace(/_/g, ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeepLearningDatasetViewer;
