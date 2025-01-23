import { motion } from 'framer-motion';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    const cardHoverVariants = {
        hover: {
            scale: 1.05,
            transition: {
                type: "spring",
                stiffness: 300
            }
        }
    };

    return (
        <motion.div 
            className="min-h-screen bg-gray-50"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Hero Section */}
            <motion.section 
                className="py-20 px-4 bg-gradient-to-br from-blue-600 to-blue-800 text-white"
                variants={itemVariants}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h1 
                        className="text-5xl font-bold mb-6"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        Community Energy Connectors
                    </motion.h1>
                    <motion.p 
                        className="text-xl mb-8"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Empowering communities through clean energy initiatives
                    </motion.p>
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section 
                className="py-16 px-4"
                variants={itemVariants}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-3xl font-bold mb-8 text-gray-800"
                        variants={itemVariants}
                    >
                        About CEC
                    </motion.h2>
                    <motion.div 
                        className="prose prose-lg text-gray-600"
                        variants={itemVariants}
                    >
                        <motion.p 
                            className="mb-6"
                            variants={itemVariants}
                        >
                            The Community Energy Connectors (CEC) initiative, led by the U.S. Department of Energy's Office of State and Community Energy Programs (SCEP), aims to establish a network of regional partner organizations to provide technical assistance and capacity-building support to communities.
                        </motion.p>
                        <motion.p 
                            className="mb-6"
                            variants={itemVariants}
                        >
                            The mission of CEC is to strengthen local clean energy support systems by engaging various stakeholders—including utilities, community-based organizations, academic institutions, industry, and economic development agencies—to plan, implement, and scale clean energy projects.
                        </motion.p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Resources Section */}
            <motion.section 
                className="py-16 px-4 bg-gray-100"
                variants={itemVariants}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-3xl font-bold mb-8 text-gray-800"
                        variants={itemVariants}
                    >
                        Our Services
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-md"
                            variants={cardHoverVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-xl font-semibold mb-4">Technical Assistance</h3>
                            <p className="text-gray-600">Supporting communities in transforming clean energy goals into "shovel-ready" projects</p>
                        </motion.div>
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-md"
                            variants={cardHoverVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-xl font-semibold mb-4">Capacity Building</h3>
                            <p className="text-gray-600">Providing workshops, training sessions, and resources for stakeholder development</p>
                        </motion.div>
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-md"
                            variants={cardHoverVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-xl font-semibold mb-4">Community Engagement</h3>
                            <p className="text-gray-600">Facilitating collaboration between local organizations and energy initiatives</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section 
                className="py-16 px-4"
                variants={itemVariants}
            >
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2 
                        className="text-3xl font-bold mb-8 text-gray-800"
                        variants={itemVariants}
                    >
                        Get In Touch
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-gray-600 mb-4"
                        variants={itemVariants}
                    >
                        Have questions? We're here to help!
                    </motion.p>
                    <motion.a 
                        href="mailto:info@ceconnectors.org" 
                        className="text-blue-600 hover:text-blue-800 text-lg font-semibold"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        info@ceconnectors.org
                    </motion.a>
                </div>
            </motion.section>
        </motion.div>
    )
}

export default Home