import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What does it cost to list a business on PakListings?",
    answer: "Listing costs a one-time fee — Basic PKR 99, Premium PKR 199, Featured PKR 299 — with no monthly subscription. Anyone can see a business's phone number, WhatsApp link and address at once — no account, no paywall, from Karachi to Islamabad and beyond."
  },
  {
    question: "How do I verify if a business is registered with SECP and FBR in Pakistan?",
    answer: "Ask the business for its National Tax Number or SECP registration number, then check it yourself on the FBR Active Taxpayer List or the SECP company registry. That confirms the legal name, status and registered office before you pay anything."
  },
  {
    question: "Why do many local directories block phone numbers behind login walls?",
    answer: "Usually to force you into creating an account so they can collect your details. PakListings takes the opposite approach: verified phone numbers and WhatsApp links sit right on the public profile, so you talk to the business directly instead of through a gate."
  },
  {
    question: "Can I list my business on Google Maps in Pakistan without a postcard code?",
    answer: "Yes, in most cases. A Google Business Profile can often be verified by phone, email or video instead of postcard, and a consistent public listing — same name, address and phone on PakListings and other local platforms — helps Google trust that the business is real."
  }
]

export default function FAQSection() {
  return (
    <section className="py-20 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#155E75] mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Straight answers about listing, searching and contacting businesses on PakListings.</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-100">
              <AccordionTrigger className="text-left text-lg font-semibold text-[#155E75] hover:text-[#22D3EE] transition-colors py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
