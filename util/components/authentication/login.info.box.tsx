import { FiInfo } from "react-icons/fi";
export default function LoginInfoBox({
  length,
  index,
}: {
  length: number;
  index: number;
}) {
  const messages = [
    "Track rent payments automatically and avoid missed deadlines.",
    "Manage tenant profiles, lease agreements, and contact details.",
    "Log and track property maintenance requests with ease.",
    "Generate financial reports for all your properties instantly.",
    "Invite team members and assign custom access permissions.",
    "Keep track of vacant units and upcoming lease expirations.",
    "Send rent reminders to tenants via email or SMS.",
    "Store property documents securely in the cloud.",
    "Track utility bills and allocate costs fairly to tenants.",
    "Get insights into your rental income and expenses over time.",
    "Automate late fee calculations for overdue rent payments.",
    "Create and manage maintenance schedules for each property.",
    "Easily filter and search tenants or properties by name or status.",
    "Stay updated with real-time notifications on important events.",
    "Record move-in and move-out inspections with photo attachments.",
    "Provide tenants with an online portal for easy communication.",
    "Export reports for tax filing and financial planning.",
    "Track deposit amounts and refund statuses for each tenant.",
    "Manage supplier and contractor details for maintenance work.",
    "Access your property data from anywhere on any device.",
  ];

  const cc = Array.from({ length }, (_, i) => (
    <div className="px-5" key={i}>
<div key={i} className="flex gap-3 justify-center items-center border border-white p-3 rounded-md">
      <FiInfo size={20} />
      <p key={i} className="text-sm text-white-700 max-md:text-xs">
        {messages[i % messages.length]}
      </p>
    </div>
    </div>
    
  ));

  return <>{cc[index]}</>;
}
