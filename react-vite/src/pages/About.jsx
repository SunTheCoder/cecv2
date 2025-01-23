import { motion } from 'framer-motion';

const About = () => {
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

    return (
        <motion.div 
            className="max-w-7xl mx-auto px-4 py-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.section variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border border-blue-200">
                    <h2 className="text-2xl font-bold mb-4 text-blue-800">Mission</h2>
                    <div className="space-y-4 text-blue-700">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    </div>
                </motion.section>

                <motion.section variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border border-blue-200">
                    <h2 className="text-2xl font-bold mb-4 text-blue-800">Vision</h2>
                    <div className="space-y-4 text-blue-700">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                    </div>
                </motion.section>

                <motion.section variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border border-blue-200">
                    <h2 className="text-2xl font-bold mb-4 text-blue-800">Purpose</h2>
                    <div className="space-y-4 text-blue-700">
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
                    </div>
                </motion.section>

                <motion.section variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border border-blue-200">
                    <h2 className="text-2xl font-bold mb-4 text-blue-800">How to Use the Site</h2>
                    <div className="space-y-4 text-blue-700">
                        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                    </div>
                </motion.section>

                <motion.section variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border border-blue-200">
                    <h2 className="text-2xl font-bold mb-4 text-blue-800">User Registration</h2>
                    <div className="space-y-4 text-blue-700">
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.</p>
                    </div>
                </motion.section>

                <motion.section variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg border border-blue-200">
                    <h2 className="text-2xl font-bold mb-4 text-blue-800">Request Access</h2>
                    <div className="space-y-4 text-blue-700">
                        <p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.</p>
                    </div>
                </motion.section>
            </motion.div>
        </motion.div>
    );
};

export default About;