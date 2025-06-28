export default function WritersSection() {
  const writers = [
    {
      name: "Laura B.",
      title: "Lifestyle & Marketing Writer",
      bio: "Deputy Editor at Lifestyle Publication",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      name: "Gideon H.",
      title: "Mental Health Writer",
      bio: "Certified Counselor",
      img: "https://www.catholicsingles.com/wp-content/uploads/2020/06/blog-header-3-768x464.png",
    },
    {
      name: "Michael G.",
      title: "Tech Writer",
      bio: "Creative Technology Specialist",
      img: "https://www.shutterstock.com/image-photo/profile-picture-smiling-successful-young-260nw-2040223583.jpg",
    },
    {
      name: "Neil B.",
      title: "Tech Writer",
      bio: "Senior Software Developer",
      img: "https://www.iese.edu/standout/wp-content/uploads/2022/04/International-profile-career.jpg",
    },
    {
      name: "Kate S.",
      title: "HR & Legal Writer",
      bio: "Human Rights Lawyer",
      img: "https://www.shutterstock.com/image-photo/headshot-portrait-smiling-african-american-260nw-1941621586.jpg",
    },
    {
      name: "Joshua M.",
      title: "Tech Writer",
      bio: "Senior Software Developer",
      img: "https://cdni.iconscout.com/illustration/premium/thumb/woman-profile-illustration-download-in-svg-png-gif-file-formats--young-female-girl-avatar-portraits-pack-people-illustrations-6590622.png",
    },
    {
      name: "Patrick S.",
      title: "Personal Finance Writer",
      bio: "Licensed Broker",
      img: "https://www.shutterstock.com/image-photo/close-portrait-smiling-30s-caucasian-260nw-2246095709.jpg",
    },
    {
      name: "Ryan S.",
      title: "Finance Writer",
      bio: "Writes for The Motley Fool",
      img: "https://www.shutterstock.com/image-photo/profile-picture-smiling-young-african-260nw-1873784920.jpg",
    },
  ];

  return (
    <section className="bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Text */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight text-center lg:text-left">
            Real topic-expert writers to
            <br className="hidden lg:block" />
            build brand authority,
            <br className="hidden lg:block" />
            E.E.A.T and Google rankings
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg text-center lg:text-left">
            We assign writers that are experts in your industry to provide content
            and bylines that Google and your readers can trust. Demonstrable
            topic expertise is critical in generating traffic from Google and
            building trust with your target audience.
          </p>
        </div>

        {/* Right Writers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 sm:p-6 rounded-xl">
          {writers.map((writer, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white p-3 sm:p-4 rounded-lg shadow-sm"
            >
              <img
                src={writer.img}
                alt={writer.name}
                className="w-10 h-10 sm:w-12 lg:w-12 lg:h-12 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">{writer.name}</p>
                <p className="text-xs sm:text-sm text-gray-600 truncate">{writer.title}</p>
                <p className="text-xs text-gray-500 truncate">{writer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}