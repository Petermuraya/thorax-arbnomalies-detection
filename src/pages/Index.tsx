import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, Shield, Activity, Clock, Eye, CheckCircle, Globe, HeartPulse, Users, Zap, Cloud, BarChart2, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 flex items-center justify-center mr-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">ThoraxIQ</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Revolutionizing Chest X-Ray Diagnosis with AI
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-lg">
                AI-powered system for under-resourced healthcare settings that swiftly detects tuberculosis, pneumonia, and lung cancer with 95% accuracy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-900 hover:bg-gray-100 font-semibold">
                    Get Started
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 hover:text-white">
                    Request Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop" 
                alt="AI-powered X-ray analysis" 
                className="rounded-xl shadow-2xl max-w-full h-auto border-4 border-white/20"
                width={500}
                height={350}
              />
            </div>
          </div>
          <div className="flex justify-center mt-16">
            <a href="#problem" className="text-white animate-bounce">
              <ArrowDown size={28} />
            </a>
          </div>
        </div>
      </section>

      {/* Global Problem Section */}
      <section id="problem" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Global Diagnostic Gap in Chest Radiology
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-5xl font-bold text-blue-900 mb-4">15%</div>
              <h3 className="text-xl font-semibold mb-2">Of Global Deaths</h3>
              <p className="text-gray-600">Caused by thoracic diseases where timely diagnosis is challenging</p>
            </div>

            <div className="bg-red-50 p-6 rounded-xl">
              <div className="text-5xl font-bold text-red-700 mb-4">1:100K</div>
              <h3 className="text-xl font-semibold mb-2">Radiologist Ratio</h3>
              <p className="text-gray-600">In Africa leads to 2-4 week wait times for X-ray results</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="text-5xl font-bold text-purple-700 mb-4">$8B</div>
              <h3 className="text-xl font-semibold mb-2">Annual Loss</h3>
              <p className="text-gray-600">Hospitals lose on repeat scans due to delayed diagnosis</p>
            </div>
          </div>

          <div className="mt-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-4 md:mb-0">
                <h3 className="text-xl font-semibold mb-2">Without action:</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>40% of TB cases progress before diagnosis</li>
                  <li>3 billion people lack access to basic radiology</li>
                  <li>Current systems are fragmented and expensive ($50-200 per outsourced read)</li>
                </ul>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <Globe className="h-20 w-20 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ThoraxIQ: AI-Powered Abnormality Detection</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Our deep learning system provides fast, accurate support for radiological interpretation in low-resource settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Deep Learning</h3>
              </div>
              <p>Advanced computer vision for chest X-ray analysis trained on diverse global datasets</p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">High Accuracy</h3>
              </div>
              <p>95% sensitivity and 90% specificity validated by radiologists</p>
            </div>

            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Reduces Workload</h3>
              </div>
              <p>Cuts radiologist workload by 40% and improves diagnostic speed</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-medical-gray-dark mb-4">
              How PulmoScan AI Works
            </h2>
            <p className="text-lg text-medical-gray max-w-2xl mx-auto">
              Our streamlined process delivers accurate results in minutes, not days.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Step 1 */}
            <div className="flex-1 relative group">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full transform group-hover:-translate-y-2 transition-transform">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-blue flex items-center justify-center text-white font-bold text-lg shadow-md">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">Upload Digital X-ray</h3>
                <p className="text-medical-gray mb-4">
                  Securely upload DICOM or JPEG images through our HIPAA-compliant platform.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=400&auto=format&fit=crop" 
                    alt="Upload X-ray" 
                    className="rounded-md w-full h-40 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex-1 relative group">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full transform group-hover:-translate-y-2 transition-transform">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-teal flex items-center justify-center text-white font-bold text-lg shadow-md">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">AI Processing</h3>
                <p className="text-medical-gray mb-4">
                  Our convolutional neural networks analyze the image across multiple detection layers.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=400&auto=format&fit=crop" 
                    alt="AI Analysis" 
                    className="rounded-md w-full h-40 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex-1 relative group">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full transform group-hover:-translate-y-2 transition-transform">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-purple flex items-center justify-center text-white font-bold text-lg shadow-md">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">Clinical Validation</h3>
                <p className="text-medical-gray mb-4">
                  Results are reviewed by our medical team and graded by confidence levels.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop" 
                    alt="Expert Review" 
                    className="rounded-md w-full h-40 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex-1 relative group">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full transform group-hover:-translate-y-2 transition-transform">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-medical-green flex items-center justify-center text-white font-bold text-lg shadow-md">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-4 text-medical-gray-dark pt-2">Detailed Report</h3>
                <p className="text-medical-gray mb-4">
                  Receive a comprehensive PDF report with annotated images and clinical recommendations.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <img 
                    src="https://images.unsplash.com/photo-1581595214962-0ec4c5e30c7b?q=80&w=400&auto=format&fit=crop" 
                    alt="Get Results" 
                    className="rounded-md w-full h-40 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features & Technology</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">All-in-One Platform</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <span>AI Detection: Identifies 20+ thoracic conditions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <span>Teleconsultation: Built-in chat and scan annotation tools</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <span>Works Anywhere: Supports online and offline modes</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Fast & Accurate</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <span>Generates results in under 8 minutes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <span>95% accuracy validated by radiologists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <span>HIPAA-compliant and secure cloud platform</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">Technology Stack</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Layers className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Deep Learning</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Cloud className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Cloud Platform</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <BarChart2 className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>Diverse Datasets</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <span>PACS Integration</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop" 
                  alt="AI Technology" 
                  className="rounded-lg shadow-md"
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Social Impact & Value Creation</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <HeartPulse className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Early Diagnosis</h3>
              <p className="text-gray-600">Reduces TB mortality by 40% and identifies lung cancer at earlier stages</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Health System Benefits</h3>
              <p className="text-gray-600">Frees up radiologists' time and cuts hospital waitlists by 50%</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Economic Impact</h3>
              <p className="text-gray-600">Saves $1B+ annually by preventing unnecessary scans and repeat visits</p>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 p-8 rounded-xl border border-blue-100">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <h3 className="text-2xl font-semibold mb-4 text-blue-900">UN Sustainable Development Goal #3</h3>
                <p className="text-gray-700 mb-4">
                  ThoraxIQ supports Good Health and Well-being by bringing expert diagnostics to underserved regions.
                </p>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mr-4">
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                  <span className="font-semibold">Target: 1M+ scans/year in Africa/SE Asia by 2026</span>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <img 
                  src="https://www.un.org/sustainabledevelopment/wp-content/uploads/2019/07/SDG_Guidelines_AUG_2019_Final_3.png" 
                  alt="UN SDG 3" 
                  className="h-40 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Team & Expertise</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Founders</h3>
              <p className="text-gray-600 mb-4">
                Seasoned entrepreneurs with backgrounds in AI, IoT, and nursing, bringing a unique blend of technical and healthcare expertise.
              </p>
              <div className="flex -space-x-2">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="w-12 h-12 rounded-full bg-blue-100 border-2 border-white"></div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Advisors</h3>
              <p className="text-gray-600 mb-4">
                World-renowned pulmonologists and global health specialists guiding our strategy and ensuring clinical relevance.
              </p>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="w-12 h-12 rounded-full bg-green-100 border-2 border-white"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl font-semibold mb-4 text-blue-900">Track Record</h3>
            <p className="text-gray-700 mb-4">
              Proven success in medical imaging and software development, delivering innovative solutions to healthcare challenges.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-white rounded-full text-sm font-medium">Medical Imaging</div>
              <div className="px-4 py-2 bg-white rounded-full text-sm font-medium">AI Development</div>
              <div className="px-4 py-2 bg-white rounded-full text-sm font-medium">Healthcare IoT</div>
              <div className="px-4 py-2 bg-white rounded-full text-sm font-medium">Clinical Validation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Revolutionizing Respiratory Diagnosis</h2>
            <p className="text-xl mb-8">
              Seeking Ksh 20M seed funding to scale operations and bring AI diagnostics to underserved communities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Market Opportunity</h3>
                <p>$2.5B global market for AI in medical imaging</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Business Model</h3>
                <p>SaaS subscription based on usage/beds</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <h3 className="font-semibold mb-2">Partnerships</h3>
                <p>NGOs, government agencies, and hospitals</p>
              </div>
            </div>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 font-semibold">
              Invest in ThoraxIQ
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;