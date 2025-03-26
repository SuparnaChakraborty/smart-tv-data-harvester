
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImagesProps {
  productImages: string[];
  manufacturerImages: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({
  productImages,
  manufacturerImages,
}) => {
  const [currentProductImage, setCurrentProductImage] = useState(0);
  const [currentManufacturerImage, setCurrentManufacturerImage] = useState(0);

  const navigateProductImage = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentProductImage((prev) => 
        prev === productImages.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentProductImage((prev) => 
        prev === 0 ? productImages.length - 1 : prev - 1
      );
    }
  };

  const navigateManufacturerImage = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentManufacturerImage((prev) => 
        prev === manufacturerImages.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentManufacturerImage((prev) => 
        prev === 0 ? manufacturerImages.length - 1 : prev - 1
      );
    }
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-6">
        <Tabs defaultValue="product" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="product" className="text-sm">Product Images</TabsTrigger>
            <TabsTrigger value="manufacturer" className="text-sm">Manufacturer Images</TabsTrigger>
          </TabsList>
          
          <TabsContent value="product">
            <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden">
              {productImages.length > 0 ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={productImages[currentProductImage]} 
                      alt={`Product view ${currentProductImage + 1}`}
                      className="max-w-full max-h-full object-contain animate-blur-in"
                    />
                  </div>
                  
                  {productImages.length > 1 && (
                    <>
                      <button 
                        onClick={() => navigateProductImage("prev")}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-2 shadow-md transition-transform hover:scale-105"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={() => navigateProductImage("next")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-2 shadow-md transition-transform hover:scale-105"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                        {productImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentProductImage(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentProductImage
                                ? "bg-primary w-4"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  No product images available
                </div>
              )}
            </div>
            
            {productImages.length > 0 && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {currentProductImage + 1} / {productImages.length}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="manufacturer">
            <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden">
              {manufacturerImages.length > 0 ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={manufacturerImages[currentManufacturerImage]} 
                      alt={`Manufacturer image ${currentManufacturerImage + 1}`}
                      className="max-w-full max-h-full object-contain animate-blur-in"
                    />
                  </div>
                  
                  {manufacturerImages.length > 1 && (
                    <>
                      <button 
                        onClick={() => navigateManufacturerImage("prev")}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-2 shadow-md transition-transform hover:scale-105"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={() => navigateManufacturerImage("next")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-2 shadow-md transition-transform hover:scale-105"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                        {manufacturerImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentManufacturerImage(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentManufacturerImage
                                ? "bg-primary w-4"
                                : "bg-gray-300 dark:bg-gray-600"
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  No manufacturer images available
                </div>
              )}
            </div>
            
            {manufacturerImages.length > 0 && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                {currentManufacturerImage + 1} / {manufacturerImages.length}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProductImages;
