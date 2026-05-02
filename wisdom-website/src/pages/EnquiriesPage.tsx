import { useEffect, useState } from 'react';
import { useEnquiryStore } from '../stores/enquiryStore';
import { useAuthStore } from '../stores/authStore';
import { EnquiryForm } from '../components/enquiries/EnquiryForm';
import { EnquiryList } from '../components/enquiries/EnquiryList';
import type { Enquiry } from '../types';

export function EnquiriesPage() {
  const { getUserEnquiries } = useEnquiryStore();
  const { currentUser } = useAuthStore();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const loadEnquiries = () => {
    if (currentUser) {
      setEnquiries(getUserEnquiries(currentUser.id));
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [currentUser]);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-wisdom-sidebar mb-6">Enquiries</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3">Submit an Enquiry</h2>
        <div className="bg-white rounded-xl p-6 border border-wisdom-primary/20">
          <p className="text-sm text-wisdom-text/70 mb-4">
            Have a question about navigating STEM pathways? Submit an enquiry and our team will get back to you.
          </p>
          <EnquiryForm onSuccess={loadEnquiries} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3">Your Enquiries</h2>
        <EnquiryList enquiries={enquiries} />
      </section>
    </div>
  );
}
