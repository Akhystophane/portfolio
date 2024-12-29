import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const AboutMe = () => {
  const { isDarkMode } = useTheme();

  const beyondScreenItems = [
    {
      title: "Sports",
      icon: "🏊‍♂️",
      description: "I’ve been swimming since the age of five and later took up triathlon during my teenage years. While I no longer compete, I continue to train regularly, including swimming, running, and going to the gym. For me, sports are essential—not only for staying physically fit but also for maintaining mental balance. They help me relax, recharge, and work more efficiently. One of my dreams is to complete an Ironman in the coming years.",
    },
    {
      title: "Entrepreneurship",
      icon: "📚",
      description: "My passion for entrepreneurship began in my teenage years. I’ve always been fascinated by the stories of both successful and less successful founders, learning from their journeys. I genuinely enjoy building products, and the idea that people can derive real utility from something I’ve created is deeply fulfilling. I also believe that working on exciting projects is the best way to acquire new skills, pushing me to keep innovating and learning.",
    },
    {
      title: "Creativity",
      icon: "🎨",
      description: "At first, I didn’t think content creation was for me, but I’m not the type of person to let others define my potential or put me in a box. Over time, I’ve embraced the challenge and discovered how much I enjoy crafting engaging content. Content creation not only allows me to express the creative side of my personality but also plays a crucial role in B2C engagement. I’m confident that my skills in this area will continue to grow as I keep exploring and learning.",
    },
  ];

  return (
    <section className={'py-16 px-4 z-10'}>
      <div className="max-w-6xl mx-auto ">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <h2 className="text-4xl font-bold text-cyan-400 mb-4"><span className={`${isDarkMode ? ('text-white') : 'text-gray-900'}`}>About</span> Me</h2>
          <div className={`h-1 w-[14rem] mx-auto rounded-full bg-cyan-400`} />
        </motion.div>

        {/* Who I Am Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`mb-16 p-8 rounded-2xl shadow-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-6">Who I Am</h3>
          <div className={`prose ${isDarkMode ? 'prose-invert' : ''} max-w-none`}>
            <p className={`text-lg leading-relaxed ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I’m Emmanuel, a French student originally from the island of Guadeloupe, where I grew up until the age of 18 before moving to Paris to pursue my studies at Sciences Po. Now in my third year, majoring in Economics, I’ve developed solid skills in technology and web development, driven by a passion for entrepreneurship and innovation. I believe in the importance of continuous learning and skill development, especially in a world where knowledge is more accessible than ever.
            </p>
          </div>
        </motion.div>

        {/* Beyond the Screen Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-8">Beyond the Screen</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beyondScreenItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                className={`p-6 rounded-xl shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } transform transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{item.icon}</span>
                  <h4 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {item.title}
                  </h4>
                </div>
                <p className={`${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-20 left-10 w-64 h-64 rounded-full ${
            isDarkMode ? 'bg-cyan-900' : 'bg-cyan-100'
          } opacity-20 blur-3xl`} />
          <div className={`absolute bottom-20 right-10 w-64 h-64 rounded-full ${
            isDarkMode ? 'bg-purple-900' : 'bg-purple-100'
          } opacity-20 blur-3xl`} />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;