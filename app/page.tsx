import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Achieve Your Goals in 12-Week Sprints
            </h2>
            <p className="text-xl mb-8 text-gray-600">
              Transform your year with our goal-setting methodology. Break down
              your annual objectives into manageable 12-week sprints for maximum
              productivity and success.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-xs"
              />
              <Button size="lg">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Why 12 Weeks?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                "Increased Focus and Urgency",
                "Manageable Time Frame",
                "Rapid Progress and Feedback",
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                  <p className="text-lg">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-center">
              How It Works
            </h3>
            <ol className="list-decimal list-inside space-y-4">
              <li className="text-lg">Set your annual goals</li>
              <li className="text-lg">
                Break them down into 12-week objectives
              </li>
              <li className="text-lg">Create weekly action plans</li>
              <li className="text-lg">Track your progress daily</li>
              <li className="text-lg">Review and adjust every 12 weeks</li>
            </ol>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Transform Your Year?
            </h3>
            <Button size="lg">
              Start Your 12-Week Journey <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2024 Year of 12 Weeks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
