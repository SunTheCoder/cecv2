const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-5xl font-bold mb-6">Community Energy Connectors</h1>
                    <p className="text-xl mb-8">Empowering communities through clean energy initiatives</p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">About CEC</h2>
                    <div className="prose prose-lg text-gray-600">
                        <p className="mb-6">
                            The Community Energy Connectors (CEC) initiative, led by the U.S. Department of Energy's Office of State and Community Energy Programs (SCEP), aims to establish a network of regional partner organizations to provide technical assistance and capacity-building support to communities.
                        </p>
                        <p className="mb-6">
                            The mission of CEC is to strengthen local clean energy support systems by engaging various stakeholders—including utilities, community-based organizations, academic institutions, industry, and economic development agencies—to plan, implement, and scale clean energy projects.
                        </p>
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section className="py-16 px-4 bg-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Services</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Technical Assistance</h3>
                            <p className="text-gray-600">Supporting communities in transforming clean energy goals into "shovel-ready" projects</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Capacity Building</h3>
                            <p className="text-gray-600">Providing workshops, training sessions, and resources for stakeholder development</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-4">Community Engagement</h3>
                            <p className="text-gray-600">Facilitating collaboration between local organizations and energy initiatives</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Get In Touch</h2>
                    <p className="text-xl text-gray-600 mb-4">Have questions? We're here to help!</p>
                    <a href="mailto:info@ceconnectors.org" className="text-blue-600 hover:text-blue-800 text-lg font-semibold">
                        info@ceconnectors.org
                    </a>
                </div>
            </section>
        </div>
    )
}

export default Home