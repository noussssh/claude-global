import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Hello World
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Welcome to your Next.js application with shadcn/ui components. This is a beautiful, modern interface built with Tailwind CSS and Radix UI primitives.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="default">Next.js</Badge>
            <Badge variant="secondary">shadcn/ui</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="destructive">Tailwind CSS</Badge>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🚀 Fast Development
                <Badge variant="secondary">New</Badge>
              </CardTitle>
              <CardDescription>
                Build modern web applications with incredible speed using Next.js and shadcn/ui
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Learn More</Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎨 Beautiful Design
                <Badge variant="default">Popular</Badge>
              </CardTitle>
              <CardDescription>
                Stunning UI components that work seamlessly together
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="default" size="sm">Get Started</Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ⚡ Type Safety
                <Badge variant="outline">Essential</Badge>
              </CardTitle>
              <CardDescription>
                Full TypeScript support for better developer experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">Explore</Button>
            </CardFooter>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6">Ready to get started?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              Primary Action
            </Button>
            <Button variant="outline" size="lg">
              Secondary Action
            </Button>
            <Button variant="ghost" size="lg">
              Learn More
            </Button>
            <Button variant="destructive" size="lg">
              Delete Something
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Built with ❤️ using Next.js, shadcn/ui, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
