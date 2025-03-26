
import ScrapeForm from "@/components/ScrapeForm";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto text-center mb-10 animate-slide-down">
        <div className="inline-block mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
            Amazon India
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-3">
          Smart TV Data Extractor
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Extract detailed product information from any Amazon India Smart TV listing with a single click.
        </p>
      </div>
      
      <div className="w-full max-w-md mx-auto animate-fade-in">
        <ScrapeForm />
      </div>
      
      <div className="mt-16 text-center animate-slide-up">
        <h2 className="text-xl font-medium mb-4">Extract Comprehensive Product Details</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="p-4 rounded-lg glass-card transition-all-smooth hover:scale-105">
            <p className="font-medium">Product Info</p>
            <p className="text-sm text-muted-foreground mt-1">Name, ratings, price and discount</p>
          </div>
          <div className="p-4 rounded-lg glass-card transition-all-smooth hover:scale-105">
            <p className="font-medium">Bank Offers</p>
            <p className="text-sm text-muted-foreground mt-1">All available payment offers</p>
          </div>
          <div className="p-4 rounded-lg glass-card transition-all-smooth hover:scale-105">
            <p className="font-medium">Item Details</p>
            <p className="text-sm text-muted-foreground mt-1">Complete product description</p>
          </div>
          <div className="p-4 rounded-lg glass-card transition-all-smooth hover:scale-105">
            <p className="font-medium">Technical Specs</p>
            <p className="text-sm text-muted-foreground mt-1">Detailed specifications</p>
          </div>
          <div className="p-4 rounded-lg glass-card transition-all-smooth hover:scale-105">
            <p className="font-medium">Product Images</p>
            <p className="text-sm text-muted-foreground mt-1">All product visuals</p>
          </div>
          <div className="p-4 rounded-lg glass-card transition-all-smooth hover:scale-105">
            <p className="font-medium">Review Summary</p>
            <p className="text-sm text-muted-foreground mt-1">AI-generated summary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
