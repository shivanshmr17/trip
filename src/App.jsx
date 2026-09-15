import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  CloudRain,
  CupSoda,
  Heart,
  MapPinned,
  Mountain,
  Sparkles,
  TrainFront,
} from 'lucide-react'

const file = (name) => encodeURI(`/images/${name}`)

const images = {
  hero: file('images.jpg'),
  kanchenjunga: file('images (1).jpg'),
  toyTrain: file('images (2).jpg'),
  teaGarden: file('images (3).jpg'),
  mistyRoad: file('images (4).jpg'),
  cafe: file('images (3).jpg'),
  coupleMountain: file('images.jpg'),
  coupleTea: file('images (2).jpg'),
  coupleWalk: file('images (4).jpg'),
  coupleTrain: file('images (1).jpg'),
}

const noMessages = [
  'Ek baar aur soch lijiye Madam Ji 👀',
  'Pakka NO? 🥺',
  'Humari Darjeeling trip ka kya hoga phir? 😭',
  'Madam Ji, YES zyada cute lag raha hai ❤️',
  'Itni beautiful trip ko NO? 😌',
  'Last chance… soch lijiye ❤️',
]

const travelMoments = [
  {
    title: 'Chai Together',
    icon: CupSoda,
    description: 'Thandi subah, garam chai… aur tumhare saath endless baatein.',
    image: images.teaGarden,
  },
  {
    title: 'Mountain Views',
    icon: Mountain,
    description: 'View kitna bhi beautiful ho… mujhe lagta hai main tumhe hi dekh raha hounga.',
    image: images.kanchenjunga,
  },
  {
    title: 'Toy Train',
    icon: TrainFront,
    description: 'Thodi slow journey… kyunki tumhare saath time thoda aur slow chalna chahiye.',
    image: images.toyTrain,
  },
  {
    title: 'Misty Evening',
    icon: CloudRain,
    description: 'Thodi thand, thodi baarish aur tumhare saath woh peaceful si evening.',
    image: images.mistyRoad,
  },
  {
    title: 'Our Promise',
    icon: Heart,
    description: 'Promise karo, hum challenge karenge. 💫',
    image: images.hero,
  },
]

const scrapbookImages = [
  { image: images.coupleWalk, title: 'Our first Darjeeling chai.', caption: '☕' },
  { image: images.coupleMountain, title: 'Getting lost together.', caption: '📍' },
  { image: images.kanchenjunga, title: 'One beautiful view.', caption: '🌄' },
  { image: images.coupleTrain, title: 'One slow train ride.', caption: '🚂' },
  { image: images.mistyRoad, title: 'A little rain.', caption: '🌧️' },
  { image: images.hero, title: 'A lot of memories.', caption: '❤️' },
]

const floatingHearts = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${(index * 13) % 100}%`,
  top: `${(index * 17) % 60}%`,
  delay: `${index * 0.7}s`,
  duration: `${6 + (index % 5)}s`,
}))

const dreamyBackgroundImage = images.mistyRoad

const pageNames = ['Intro', 'Darjeeling', 'Trip', 'Question']

function App() {
  const [pageIndex, setPageIndex] = useState(0)
  const [noCount, setNoCount] = useState(0)
  const [yesClicked, setYesClicked] = useState(false)

  const nextPage = () => setPageIndex((prev) => Math.min(prev + 1, pageNames.length - 1))
  const prevPage = () => setPageIndex((prev) => Math.max(prev - 1, 0))

  const noMessage = noMessages[Math.min(noCount, noMessages.length - 1)]
  const yesScale = 1 + noCount * 0.12
  const noScale = Math.max(0.58, 1 - noCount * 0.1)

  const handleNo = () => setNoCount((prev) => Math.min(prev + 1, noMessages.length - 1))
  const handleYes = () => setYesClicked(true)

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#120f15] text-stone-100">
      <style>{`
        @keyframes floatHeart {
          0% { transform: translateY(20px) scale(0.7); opacity: 0; }
          20% { opacity: 0.8; }
          100% { transform: translateY(-100px) scale(1.12); opacity: 0; }
        }
        @keyframes confettiDrop {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          100% { transform: translateY(260px) rotate(360deg); opacity: 0; }
        }
        .floating-heart { animation: floatHeart var(--dur) ease-in-out infinite; }
        .confetti { animation: confettiDrop 3.8s ease-out infinite; }
        .dream-glow {
          box-shadow: 0 0 40px rgba(245, 206, 186, 0.18), inset 0 1px 0 rgba(255,255,255,0.08);
        }
      `}</style>

      <div className="fixed left-1/2 top-4 z-50 w-[calc(100%-1rem)] max-w-max -translate-x-1/2 overflow-x-auto rounded-full border border-white/15 bg-black/20 px-3 py-1.5 backdrop-blur-md sm:top-6">
        <div className="flex w-max items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-stone-200/80 sm:gap-2 sm:text-[10px] sm:tracking-[0.3em]">
          {pageNames.map((name, index) => (
            <button
              key={name}
              type="button"
              onClick={() => setPageIndex(index)}
              className={`rounded-full px-2 py-1 transition ${
                pageIndex === index ? 'bg-[#f3d3b8] text-[#1a1417]' : 'text-stone-200/70 hover:text-white'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {pageIndex === 0 && (
          <motion.section
            key="intro"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(22, 18, 29, 0.1), rgba(20, 15, 24, 0.68)), url(${images.hero})`,
                filter: 'brightness(0.82) saturate(1.18) contrast(1.15)',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(246,192,201,0.22),transparent_25%),radial-gradient(circle_at_center,rgba(99,122,151,0.18),transparent_40%),linear-gradient(180deg,rgba(14,11,18,0.12),rgba(14,11,18,0.82))]" />

            <div className="absolute inset-0 overflow-hidden opacity-70">
              {floatingHearts.map((heart) => (
                <span
                  key={heart.id}
                  className="floating-heart absolute text-[18px] text-rose-300/80"
                  style={{ left: heart.left, top: heart.top, animationDelay: heart.delay, '--dur': heart.duration }}
                >
                  ❤
                </span>
              ))}
            </div>

            <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-5xl flex-col items-center justify-center text-center">
              <div className="mb-8 flex items-center justify-center gap-2 text-[10px] font-medium uppercase tracking-[0.45em] text-stone-200/80 sm:text-xs">
                <Sparkles size={12} className="text-rose-200" />
                A little dream
              </div>
              <h1
                className="text-[clamp(3.4rem,7vw,8rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]"
                style={{ textShadow: '0 8px 30px rgba(0,0,0,0.8)' }}
              >
                Madam Ji <span className="text-rose-300">❤️</span>
              </h1>
              <p
                className="mt-8 max-w-3xl text-[clamp(1.1rem,2vw,2.3rem)] leading-relaxed text-stone-100/95 drop-shadow-[0_6px_18px_rgba(0,0,0,0.7)]"
                style={{ textShadow: '0 6px 22px rgba(0,0,0,0.75)' }}
              >
                “Ek jagah hai jahan hum dono ko jaana hai…”
              </p>
              <button
                type="button"
                onClick={nextPage}
                className="dream-glow mt-10 inline-flex items-center justify-center gap-3 rounded-full border border-white/30 bg-white/8 px-8 py-3.5 text-base font-medium text-white shadow-[0_0_30px_rgba(255,255,255,0.2)] backdrop-blur-md transition hover:bg-white/12 sm:px-9"
              >
                Dekhein? <ArrowRight size={18} />
              </button>
            </div>
          </motion.section>
        )}

        {pageIndex === 1 && (
          <motion.section
            key="darjeeling"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6 sm:py-20"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(8, 10, 18, 0.18), rgba(15, 12, 18, 0.82)), url(${dreamyBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(2px) brightness(0.72) saturate(1.18) contrast(1.06)',
                transform: 'scale(1.08)',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(165,195,230,0.18),transparent_35%),linear-gradient(180deg,rgba(16,15,19,0.12),rgba(14,15,19,0.84))]" />

            <div className="relative z-10 mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.35em] text-stone-100/80 backdrop-blur-sm sm:text-xs">
                <MapPinned size={12} />
                Darjeeling
              </div>

              <p
                className="mt-8 text-[clamp(1.5rem,3vw,2.7rem)] leading-relaxed text-stone-100/95 drop-shadow-[0_8px_18px_rgba(0,0,0,0.8)]"
                style={{ textShadow: '0 8px 20px rgba(0,0,0,0.8)' }}
              >
                “Aapko Darjeeling bahut pasand hai…”
              </p>
              <p
                className="mt-6 text-[clamp(1.2rem,2.4vw,2.3rem)] leading-relaxed text-stone-100/90 drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)]"
                style={{ textShadow: '0 6px 18px rgba(0,0,0,0.8)' }}
              >
                “Aur mujhe lagta hai…”
              </p>
              <p
                className="mt-6 text-[clamp(1.7rem,3.5vw,3.2rem)] font-medium leading-relaxed text-rose-100 drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]"
                style={{ textShadow: '0 8px 20px rgba(0,0,0,0.82)' }}
              >
                “Ek din hum dono wahan zaroor jayenge. 🌄❤️”
              </p>
              <p
                className="mt-10 text-[clamp(1rem,2vw,1.5rem)] leading-relaxed text-stone-200/90 drop-shadow-[0_6px_16px_rgba(0,0,0,0.8)]"
                style={{ textShadow: '0 5px 18px rgba(0,0,0,0.75)' }}
              >
                Toh socha… trip se pehle thoda imagine kar lete hain.
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={prevPage}
                  className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextPage}
                  className="dream-glow inline-flex items-center justify-center gap-3 rounded-full bg-[#f3d3b8] px-6 py-3 text-sm font-semibold text-[#1a1417] shadow-[0_0_35px_rgba(243,211,184,0.45)] transition hover:bg-[#f7dfbf]"
                >
                  Imagine karein <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {pageIndex === 2 && (
          <motion.section
            key="trip"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5 }}
            className="trip-page relative flex min-h-0 items-start justify-center overflow-visible px-4 py-24 pb-28 sm:min-h-screen sm:items-center sm:px-6 sm:py-20"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(15, 12, 16, 0.2), rgba(15, 12, 16, 0.78)), url(${dreamyBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(2.2px) brightness(0.66) saturate(1.2)',
                transform: 'scale(1.08)',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,206,184,0.12),transparent_28%),linear-gradient(180deg,#120f15,#17141a_45%,#110d12)]" />

            <div className="trip-page-content relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-start sm:justify-center">
              <div className="mb-8 w-full text-center">
                <p className="text-xs uppercase tracking-[0.45em] text-[#f2b0a9] sm:text-sm">Our future trip</p>
                <h2 className="mt-4 text-[clamp(2.2rem,4vw,4.4rem)] font-semibold leading-tight text-white">
                  Our Darjeeling trip
                </h2>
              </div>

              <div className="trip-grid grid w-full grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 xl:grid-cols-5">
                {travelMoments.map((moment, index) => {
                  const Icon = moment.icon
                  return (
                    <motion.article
                      key={moment.title}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08, duration: 0.45 }}
                      whileHover={{ y: -8 }}
                      className="group mx-auto w-full max-w-[260px] overflow-hidden rounded-[30px] border border-white/12 bg-white/5 shadow-[0_25px_80px_rgba(0,0,0,0.28)] backdrop-blur-md"
                    >
                      <div className="relative h-72 overflow-hidden sm:h-80 xl:h-[22rem]">
                        <img
                          src={moment.image}
                          alt={moment.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.36))]" />
                        <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[#f5d5b9] backdrop-blur-sm">
                          <Icon size={18} />
                        </div>
                      </div>
                      <div className="p-5 text-center sm:p-6">
                        <h3 className="text-[clamp(1.35rem,1.8vw,1.8rem)] font-semibold text-white">{moment.title}</h3>
                        <p className="mt-3 text-[0.98rem] leading-7 text-stone-200/85 sm:text-base">
                          {moment.description}
                        </p>
                      </div>
                    </motion.article>
                  )
                })}
              </div>

              <div className="trip-actions mt-10 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={prevPage}
                  className="rounded-full border border-white/20 bg-white/5 px-5 py-3 text-base text-white transition hover:bg-white/10"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextPage}
                  className="dream-glow inline-flex items-center justify-center gap-3 rounded-full bg-[#f3d3b8] px-7 py-3 text-base font-semibold text-[#1a1417] shadow-[0_0_35px_rgba(243,211,184,0.45)] transition hover:bg-[#f7dfbf]"
                >
                  Next page <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.section>
        )}

        {pageIndex === 3 && (
          <motion.section
            key="question"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5 }}
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(8, 10, 16, 0.24), rgba(8, 10, 16, 0.86)), url(${dreamyBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(2.4px) brightness(0.68) saturate(1.15) contrast(1.05)',
                transform: 'scale(1.08)',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,211,203,0.12),transparent_40%)]" />

            <div className="relative z-10 mx-auto w-full max-w-3xl rounded-[32px] border border-white/15 bg-black/20 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-md sm:p-8">
              <div className="mb-3 text-center text-sm uppercase tracking-[0.35em] text-[#f0c7bb] sm:text-base">Madam Ji…</div>
              <h3 className="text-center text-3xl font-semibold text-white sm:text-5xl">
                Kya aap meri forever wali favourite banengi? ❤️
              </h3>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleYes}
                  style={{ transform: `scale(${yesScale})`, boxShadow: `0 0 ${30 + noCount * 7}px rgba(253, 198, 160, 0.6)` }}
                  className="inline-flex min-w-[120px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d8b8,#f4a7a5)] px-7 py-3 text-lg font-semibold text-[#180f12] transition"
                >
                  YES <span className="ml-2">❤️</span>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNo}
                  style={{ transform: `scale(${noScale})` }}
                  className="inline-flex min-w-[120px] items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-lg font-semibold text-white backdrop-blur-sm transition"
                >
                  NO <span className="ml-2">🙈</span>
                </motion.button>
              </div>

              <p className="mt-6 text-center text-sm text-[#f7e1d5] sm:text-lg">{noMessage}</p>

              {yesClicked && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 rounded-[26px] border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
                >
                  <div className="mb-4 flex justify-center text-3xl text-rose-300">
                    <Heart className="fill-current" size={28} />
                  </div>
                  <h4 className="text-2xl font-semibold text-white">Mujhe pata tha ❤️</h4>
                  <p className="mt-3 text-lg text-stone-200/90">
                    “Ab Darjeeling trip officially hum dono ki pending hai. 🌄🫶”
                  </p>
                  <div className="mt-5 flex justify-center gap-3">
                    <button
                      type="button"
                      onClick={prevPage}
                      className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setPageIndex(0)}
                      className="rounded-full bg-[#f3d3b8] px-5 py-2 text-sm font-semibold text-[#1a1417]"
                    >
                      Start again
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <AnimatePresence>
              {yesClicked && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,197,180,0.18),transparent_30%)]" />
                  {Array.from({ length: 28 }).map((_, index) => (
                    <span
                      key={index}
                      className="confetti absolute left-1/2 top-8 text-lg text-rose-300"
                      style={{
                        left: `${(index * 13) % 100}%`,
                        animationDelay: `${index * 0.12}s`,
                        transform: `translateX(-50%) rotate(${index * 17}deg)`,
                      }}
                    >
                      ✦
                    </span>
                  ))}
                  {Array.from({ length: 18 }).map((_, index) => (
                    <span
                      key={`pulse-${index}`}
                      className="floating-heart absolute text-[22px] text-rose-300/90"
                      style={{
                        left: `${(index * 13 + 8) % 100}%`,
                        top: `${(index * 19 + 20) % 75}%`,
                        animationDelay: `${index * 0.15}s`,
                        '--dur': `${6 + (index % 4)}s`,
                      }}
                    >
                      ❤
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
