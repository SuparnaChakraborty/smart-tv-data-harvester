
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Info, Tag, CreditCard, FileText, Shield } from "lucide-react";
import ProductImages from "./ProductImages";
import { ScrapedProductData } from "@/utils/scraperUtils";

interface ScrapedDataDisplayProps {
  data: ScrapedProductData;
}

const ScrapedDataDisplay: React.FC<ScrapedDataDisplayProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-medium">{data.productName}</CardTitle>
          {data.rating && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{data.rating}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                ({data.numberOfRatings} ratings)
              </span>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <span className="text-muted-foreground text-sm">Selling Price</span>
              <div className="text-2xl font-semibold">{data.sellingPrice}</div>
            </div>
            
            {data.totalDiscount && (
              <Badge variant="outline" className="py-1.5">
                <Tag size={14} className="mr-1" />
                {data.totalDiscount} Off
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductImages 
          productImages={data.productImages || []} 
          manufacturerImages={data.manufacturerImages || []} 
        />
        
        <Card className="glass-card overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Shield size={18} />
              Customer Review Summary
            </CardTitle>
            <CardDescription>AI-generated summary of customer reviews</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="italic text-muted-foreground">{data.reviewSummary || "No review summary available"}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {data.bankOffers && data.bankOffers.length > 0 && (
          <AccordionItem value="bank-offers" className="glass-card overflow-hidden rounded-lg mb-4">
            <AccordionTrigger className="px-6 py-4">
              <div className="flex items-center gap-2">
                <CreditCard size={18} />
                <span>Bank Offers</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <ul className="space-y-2">
                {data.bankOffers.map((offer, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                      <CreditCard size={14} className="text-primary" />
                    </div>
                    <span>{offer}</span>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {data.aboutThisItem && data.aboutThisItem.length > 0 && (
          <AccordionItem value="about-this-item" className="glass-card overflow-hidden rounded-lg mb-4">
            <AccordionTrigger className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Info size={18} />
                <span>About This Item</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <ul className="space-y-2 list-disc pl-5">
                {data.aboutThisItem.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}
        
        {data.productInformation && Object.keys(data.productInformation).length > 0 && (
          <AccordionItem value="product-information" className="glass-card overflow-hidden rounded-lg">
            <AccordionTrigger className="px-6 py-4">
              <div className="flex items-center gap-2">
                <FileText size={18} />
                <span>Technical Details</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(data.productInformation).map(([key, value], index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                    {index < Object.entries(data.productInformation).length - 1 && (
                      <Separator className="mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};

export default ScrapedDataDisplay;
