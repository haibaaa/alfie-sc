'use client';
import { useState } from 'react';
import { createDispute } from '../../actions/disputes'; // Make sure this path is correct
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { AlertCircle } from "lucide-react";

export default function DisputeForm() {
  const [formData, setFormData] = useState({
    orderId: '',
    complainantId: '',
    respondentId: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      await createDispute({
        orderId: Number(formData.orderId),
        complainantId: Number(formData.complainantId),
        respondentId: Number(formData.respondentId),
        description: formData.description,
      });
      
      setSubmitStatus({ 
        type: 'success', 
        message: 'Dispute submitted successfully!' 
      });
      
      // Reset the form after submission
      setFormData({
        orderId: '',
        complainantId: '',
        respondentId: '',
        description: '',
      });
    } catch (error) {
      console.error("Error submitting dispute:", error);
      setSubmitStatus({ 
        type: 'error', 
        message: 'There was an error submitting your dispute.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-[#1c1c1c] border-0 text-white">
      <CardHeader>
        <CardTitle className="text-lg">File a New Dispute</CardTitle>
        <CardDescription className="text-gray-400">
          Submit details about your dispute for review
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="orderId" className="text-sm text-gray-400">Order ID</label>
            <Input
              id="orderId"
              type="number"
              name="orderId"
              placeholder="Enter the order ID"
              required
              value={formData.orderId}
              onChange={handleChange}
              className="bg-[#252525] border-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="complainantId" className="text-sm text-gray-400">Complainant ID</label>
            <Input
              id="complainantId"
              type="number"
              name="complainantId"
              placeholder="Your user ID"
              required
              value={formData.complainantId}
              onChange={handleChange}
              className="bg-[#252525] border-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="respondentId" className="text-sm text-gray-400">Respondent ID</label>
            <Input
              id="respondentId"
              type="number"
              name="respondentId"
              placeholder="ID of the other party"
              required
              value={formData.respondentId}
              onChange={handleChange}
              className="bg-[#252525] border-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm text-gray-400">Description</label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your issue in detail..."
              required
              value={formData.description}
              onChange={handleChange}
              className="bg-[#252525] border-gray-700 text-white min-h-24"
            />
          </div>
          
          {submitStatus && (
            <div className={`p-3 rounded-md flex items-center gap-2 text-sm ${
              submitStatus.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              <AlertCircle className="h-4 w-4" />
              <span>{submitStatus.message}</span>
            </div>
          )}
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 hover:bg-green-600 text-black w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Dispute'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}