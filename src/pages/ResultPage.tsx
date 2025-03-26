
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrapedProductData, saveScrapedData } from "@/utils/scraperUtils";
import ScrapedDataDisplay from "@/components/ScrapedDataDisplay";
import { ArrowLeft, Download, Copy, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ResultPage = () => {
  const [scrapedData, setScrapedData] = useState<ScrapedProductData | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get the scraped data from localStorage
    const storedData = localStorage.getItem("scrapedData");
    
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setScrapedData(parsedData);
      } catch (error) {
        console.error("Error parsing scraped data:", error);
        // Redirect back to home if data is invalid
        navigate("/");
      }
    } else {
      // Redirect back to home if no data is found
      navigate("/");
    }
  }, [navigate]);

  const handleSaveData = () => {
    if (scrapedData) {
      saveScrapedData(scrapedData);
      toast({
        title: "Success",
        description: "Data saved successfully",
      });
    }
  };

  const handleCopyData = () => {
    if (scrapedData) {
      navigator.clipboard.writeText(JSON.stringify(scrapedData, null, 2))
        .then(() => {
          toast({
            title: "Copied!",
            description: "Data copied to clipboard",
          });
        })
        .catch((error) => {
          console.error("Error copying data:", error);
          toast({
            title: "Error",
            description: "Failed to copy data",
            variant: "destructive",
          });
        });
    }
  };

  const handleShare = () => {
    if (scrapedData && navigator.share) {
      navigator.share({
        title: scrapedData.productName,
        text: `Check out this TV: ${scrapedData.productName}`,
      })
        .then(() => {
          toast({
            title: "Shared!",
            description: "Content shared successfully",
          });
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      toast({
        title: "Info",
        description: "Sharing is not supported on this device",
      });
    }
  };

  if (!scrapedData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
        <div className="text-center animate-pulse">
          <p className="text-lg">Loading scraped data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="self-start flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Button>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleCopyData} className="flex items-center gap-2">
              <Copy size={16} />
              <span className="hidden sm:inline">Copy</span>
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="default" onClick={handleSaveData} className="flex items-center gap-2">
              <Download size={16} />
              <span className="hidden sm:inline">Download JSON</span>
            </Button>
          </div>
        </div>
        
        <ScrapedDataDisplay data={scrapedData} />
      </div>
    </div>
  );
};

export default ResultPage;
