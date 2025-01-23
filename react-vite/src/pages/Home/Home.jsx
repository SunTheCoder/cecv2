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
            className="min-h-screen bg-stone-50"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Hero Section */}
            <motion.section 
                className="py-20 px-4 bg-gradient-to-br from-amber-800 to-stone-900 text-white"
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
                        Nurturing sustainable energy solutions for our communities
                    </motion.p>
                </div>
            </motion.section>

            {/* About Section */}
            <motion.section 
                className="py-16 px-4 bg-stone-100"
                variants={itemVariants}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-3xl font-bold mb-8 text-amber-900"
                        variants={itemVariants}
                    >
                        About CEC
                    </motion.h2>
                    <motion.div 
                        className="prose prose-lg text-stone-700"
                        variants={itemVariants}
                    >
                        <motion.p 
                            className="mb-6"
                            variants={itemVariants}
                        >
                            The Community Energy Connectors (CEC) initiative, rooted in the U.S. Department of Energy's Office of State and Community Energy Programs (SCEP), cultivates a network of regional partners to provide sustainable energy solutions and empower local communities.
                        </motion.p>
                        <motion.p 
                            className="mb-6"
                            variants={itemVariants}
                        >
                            Our mission is to grow resilient local energy ecosystems by bringing together diverse stakeholders—from grassroots organizations to utilities, academic institutions, and local businesses—to plant the seeds of sustainable energy projects and watch them flourish.
                        </motion.p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Resources Section */}
            <motion.section 
                className="py-16 px-4 bg-amber-50"
                variants={itemVariants}
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2 
                        className="text-3xl font-bold mb-8 text-amber-900"
                        variants={itemVariants}
                    >
                        Our Services
                    </motion.h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-600"
                            variants={cardHoverVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-stone-800">Technical Assistance</h3>
                            <p className="text-stone-600">Cultivating clean energy initiatives from seed to harvest, transforming ideas into thriving projects</p>
                        </motion.div>
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-600"
                            variants={cardHoverVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-stone-800">Capacity Building</h3>
                            <p className="text-stone-600">Growing knowledge through workshops, training sessions, and enriching resources</p>
                        </motion.div>
                        <motion.div 
                            className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-600"
                            variants={cardHoverVariants}
                            whileHover="hover"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-stone-800">Community Engagement</h3>
                            <p className="text-stone-600">Fostering deep roots between local organizations and sustainable energy initiatives</p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Contact Section */}
            <motion.section 
                className="py-16 px-4 bg-stone-100"
                variants={itemVariants}
            >
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2 
                        className="text-3xl font-bold mb-8 text-amber-900"
                        variants={itemVariants}
                    >
                        Let's Grow Together
                    </motion.h2>
                    <motion.p 
                        className="text-xl text-stone-700 mb-4"
                        variants={itemVariants}
                    >
                        Ready to plant the seeds of change? Reach out to us!
                    </motion.p>
                    <motion.a 
                        href="mailto:info@ceconnectors.org" 
                        className="text-amber-700 hover:text-amber-900 text-lg font-semibold"
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