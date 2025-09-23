import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  X,
  File
} from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { LoanData } from '../../hooks/useLoanData';

interface DocumentUploadProps {
  loan: LoanData;
  onClose: () => void;
}

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  url?: string;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({ loan, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  // Mock requested documents based on stage
  const requestedDocs = loan.requestedDocs.length > 0 ? loan.requestedDocs : [
    'Identity Proof (Aadhaar/PAN)',
    'Income Proof (Salary Slips)',
    'Bank Statements (Last 3 months)',
    'Educational Certificates'
  ];

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Invalid File Type',
          description: 'Please upload only PDF, JPG, or PNG files',
          variant: 'destructive'
        });
        return;
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: 'File Too Large',
          description: 'Please upload files smaller than 10MB',
          variant: 'destructive'
        });
        return;
      }

      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newFile: UploadedFile = {
        id: fileId,
        file,
        status: 'uploading',
        progress: 0
      };

      setUploadedFiles(prev => [...prev, newFile]);

      // Simulate upload process
      simulateUpload(fileId);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.progress + Math.random() * 30, 100);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            return {
              ...file,
              status: 'success',
              progress: 100,
              url: `https://example.com/uploads/${fileId}`
            };
          }
          
          return { ...file, progress: newProgress };
        }
        return file;
      }));
    }, 500);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleSubmit = () => {
    const successfulUploads = uploadedFiles.filter(file => file.status === 'success');
    
    if (successfulUploads.length === 0) {
      toast({
        title: 'No Documents',
        description: 'Please upload at least one document before submitting',
        variant: 'destructive'
      });
      return;
    }

    // Mock submission
    toast({
      title: 'Documents Submitted',
      description: `${successfulUploads.length} document(s) uploaded successfully. Your application status will be updated shortly.`,
    });

    onClose();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Required Documents
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Required Documents List */}
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Required Documents:</h3>
            <div className="grid gap-2">
              {requestedDocs.map((doc, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{doc}</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    Required
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop files here, or click to browse
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">
                Choose Files
              </label>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Supported formats: PDF, JPG, PNG • Max size: 10MB per file
            </p>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Uploaded Files:</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <Card key={file.id} className="p-3">
                    <div className="flex items-center gap-3">
                      <File className="w-8 h-8 text-primary flex-shrink-0" />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium truncate">
                            {file.file.name}
                          </p>
                          <div className="flex items-center gap-2">
                            {file.status === 'success' && (
                              <CheckCircle className="w-4 h-4 text-success" />
                            )}
                            {file.status === 'error' && (
                              <AlertCircle className="w-4 h-4 text-danger" />
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{formatFileSize(file.file.size)}</span>
                          <span>{file.status === 'uploading' ? `${Math.round(file.progress)}%` : file.status}</span>
                        </div>
                        
                        {file.status === 'uploading' && (
                          <Progress value={file.progress} className="h-1 mt-1" />
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={uploadedFiles.filter(f => f.status === 'success').length === 0}
              className="bg-primary hover:bg-primary-hover"
            >
              Submit Documents
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};