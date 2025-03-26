
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { scrapeAmazonProduct } from "@/utils/scraperUtils";
import { ArrowRight, Loader2 } from "lucide-react";

const ScrapeForm = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter an Amazon product URL",
        variant: "destructive",
      });
      return;
    }
    
    if (!url.includes("amazon.in")) {
      toast({
        title: "Error",
        description: "Please enter a valid Amazon India URL",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const scrapedData = await scrapeAmazonProduct(url);
      
      // Store the scraped data in localStorage
      localStorage.setItem("scrapedData", JSON.stringify(scrapedData));
      
      // Navigate to the results page
      navigate("/results");
      
      toast({
        title: "Success",
        description: "Product data scraped successfully!",
      });
    } catch (error) {
      console.error("Error scraping product:", error);
      toast({
        title: "Error",
        description: "Failed to scrape product data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="glass-card w-full max-w-md mx-auto overflow-hidden group">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-medium text-center">
              Enter Amazon India Smart TV Product URL
            </h3>
            <p className="text-muted-foreground text-sm text-center">
              Paste the full product URL from Amazon India
            </p>
          </div>
          
          <div className="relative">
            <Input
              type="url"
              placeholder="https://www.amazon.in/product-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pr-12 h-12 transition-all-smooth focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 font-medium transition-all-smooth group overflow-hidden relative"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={18} />
                Scraping...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Extract Product Data
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </span>
            )}
            <span className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-md"></span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ScrapeForm;
