import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (412) 320-9569",
    href: "tel:+14123209569",
    plusSignAndOnlyDashesValue: "+1-412-320-9569",
  },
  {
    icon: Mail,
    label: "Email",
    value: "dacarchdesign@gmail.com",
    href: "mailto:dacarchdesign@gmail.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "5767 75th Ave, Pinellas Park\nPinellas Park, FL 33781",
    href: "https://maps.google.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
    href: null,
  },
];

export const testimonialsArray = [
  {
    id: "1",
    content:
      "This product has completely transformed how we work! The team is responsive, the features are intuitive, and the results speak for themselves. Highly recommended!",
    author: "Sarita Johnson",
    role: "CEO",
    company: "TechStart Inc",
    avatar: "/professional-woman-diverse.png",
    rating: 5,
  },
  {
    id: "2",
    content:
      "Outstanding service from start to finish. The attention to detail and commitment to excellence is evident in every interaction. We couldn't be happier with our decision.",
    author: "Michael Chen",
    role: "Product Manager",
    company: "InnovateCo",
    avatar: "/professional-man.jpg",
    rating: 5,
  },
  {
    id: "3",
    content:
      "A game-changer for our business. The ROI was immediate and the ongoing support has been exceptional. This is exactly what we were looking for.",
    author: "Emily Rodriguez",
    role: "Director of Operations",
    company: "Growth Solutions",
    avatar: "/professional-woman-smiling.png",
    rating: 5,
  },
  {
    id: "4",
    content:
      "The level of professionalism and expertise is unmatched. They understood our needs perfectly and delivered beyond our expectations. Absolutely fantastic!",
    author: "David Thompson",
    role: "CTO",
    company: "Digital Dynamics",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "5",
    content:
      "Implementing this solution was seamless. The support team guided us every step of the way, and we saw results within the first week. Couldn't ask for more!",
    author: "Jennifer Martinez",
    role: "VP of Marketing",
    company: "Brand Builders",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
  {
    id: "6",
    content:
      "Simply outstanding! The quality of work and dedication to customer success is remarkable. This has been one of the best investments we've made.",
    author: "Robert Kim",
    role: "Founder",
    company: "StartupHub",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
  },
];
