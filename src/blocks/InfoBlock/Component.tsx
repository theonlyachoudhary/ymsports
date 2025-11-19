export function InfoBlock({ phone, location, businessHours }) {
  return (
    <section className="w-full py-16 px-6 flex justify-center">
      <div className="
        w-full max-w-3xl 
        bg-[#f7f4ed] 
        rounded-3xl 
        shadow-sm 
        px-10 py-12
      ">
        
        {/* PHONE */}
        <h3 className="font-heading text-2xl mb-2 tracking-wide">PHONE</h3>
        <p className="text-neutral-800 text-lg whitespace-pre-line mb-10">
          {phone}
        </p>

        {/* LOCATION */}
        <h3 className="font-heading text-2xl mb-2 tracking-wide">LOCATION</h3>
        <p className="text-neutral-800 text-lg whitespace-pre-line mb-10">
          {location}
        </p>

        {/* HOURS */}
        <h3 className="font-heading text-2xl mb-2 tracking-wide">BUSINESS HOURS</h3>
        <p className="text-neutral-800 text-lg whitespace-pre-line">
          {businessHours}
        </p>
      </div>
    </section>
  );
}
