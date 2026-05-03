"use client";

import { useEffect, useState } from "react";
import {
  InstagramIcon,
  XIcon,
  DiscordIcon,
  RedditIcon,
  ArrowIcon,
  SparkIcon,
  CheckIcon,
} from "./icons";

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/leonidalabs/", Icon: InstagramIcon, brand: "instagram" },
  { name: "X.com", href: "https://x.com/LeonidaLabs", Icon: XIcon, brand: "x" },
  { name: "Discord", href: "https://discord.gg/qpVsgDzXF", Icon: DiscordIcon, brand: "discord" },
  { name: "Reddit", href: "https://www.reddit.com/r/LeonidaLabs/", Icon: RedditIcon, brand: "reddit" },
];

function FadeIn({
  delay = 0,
  duration = 1000,
  children,
  as: Tag = "div",
  className,
  style,
  translateY = 0,
}: {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  translateY?: number;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  const Comp: React.ElementType = Tag;
  return (
    <Comp
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${translateY}px)`,
        transition: `opacity ${duration}ms ease, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        ...style,
      }}
    >
      {children}
    </Comp>
  );
}

function AnimatedHeading({
  text,
  className,
  style,
  charDelay = 28,
  initialDelay = 200,
  charDuration = 600,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  charDelay?: number;
  initialDelay?: number;
  charDuration?: number;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShown(true), initialDelay);
    return () => clearTimeout(t);
  }, [initialDelay]);

  const lines = text.split("\n");
  let runningCount = 0;

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="heading-line">
          {Array.from(line).map((ch, charIdx) => {
            const totalDelay = runningCount++ * charDelay;
            return (
              <span
                key={charIdx}
                className="heading-char"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity ${charDuration}ms ease, transform ${charDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                  transitionDelay: `${totalDelay}ms`,
                }}
              >
                {ch === " " ? " " : ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export default function Home() {
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [email, setEmail] = useState("");
  const [contactSent, setContactSent] = useState(false);

  const handleWishlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setWishlisted(true);
    setEmail("");
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="hero" id="top">
        <div className="hero-backdrop" />
        <img
          className="hero-wallpaper"
          src="/gta6-hero.webp"
          alt=""
          aria-hidden="true"
        />
        <div className="hero-vignette" />
        <div className="hero-glow hero-glow--pink" />
        <div className="hero-glow hero-glow--cyan" />

        <div className="hero-content page-pad">
          <div className="hero-copy">
            <FadeIn delay={100} duration={900} translateY={12}>
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Now building for the GTA VI launch window
              </div>
            </FadeIn>

            <AnimatedHeading
              className="hero-headline"
              text={"Products built for\nthe GTA VI\nattention wave."}
            />

            <FadeIn delay={1100} duration={1000} translateY={20}>
              <p className="hero-sub">
                We back creators and craft software that defines what comes next
                in the biggest entertainment launch in history.
              </p>
            </FadeIn>

            <FadeIn delay={1400} duration={1000} translateY={20}>
              <div className="hero-ctas">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setWishlistOpen(true)}
                >
                  Join the Wishlist
                  <ArrowIcon size={15} />
                </button>
                <a href="#products" className="btn-ghost">
                  Explore products
                </a>
              </div>
            </FadeIn>

          </div>
        </div>

        <FadeIn
          delay={1700}
          duration={1000}
          translateY={20}
          className="hero-social-anchor"
        >
          <div className="hero-socials" aria-label="Leonida Labs social links">
            {SOCIALS.map(({ name, href, Icon, brand }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className={`social-btn social-${brand}`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={2200} duration={1200} className="scroll-cue">
          <span>Scroll</span>
          <span className="scroll-line" />
        </FadeIn>

        {wishlistOpen && (
          <div className="modal-backdrop" onClick={() => setWishlistOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button
                aria-label="Close"
                className="modal-close"
                onClick={() => setWishlistOpen(false)}
              >
                ×
              </button>
              <div className="modal-eyebrow">Early access</div>
              <h3>Join the Wishlist</h3>
              <p>Get launch access + early-bird pricing.</p>
              <form onSubmit={handleWishlist}>
                <input
                  autoFocus
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="email-input"
                />
                <button className="btn-primary full" type="submit">
                  {wishlisted ? (
                    <>
                      <CheckIcon /> You&apos;re on the list
                    </>
                  ) : (
                    <>
                      Notify me <ArrowIcon size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* ---------- PRODUCTS ---------- */}
      <section className="block products-block" id="products">
        <div className="block-glow block-glow--pink" />
        <div className="block-glow block-glow--cyan" />
        <div className="page-pad">
          <div className="section-head">
            <div className="section-eyebrow">
              <SparkIcon size={12} /> Launch command
            </div>
            <h2 className="section-title">
              Two products built for the <span className="title-accent">GTA VI attention wave.</span>
            </h2>
            <p className="section-desc">
              From trailer drops to topic breakouts, Leonida Labs turns chaos into
              creator output, trend intelligence, and faster publishing loops.
            </p>
          </div>

          <div className="products-stage">
            <div className="signal-rail" aria-hidden="true">
              <div>
                <span>Trailer 3</span>
                <strong>Creator surge</strong>
              </div>
              <div>
                <span>Launch week</span>
                <strong>Trend velocity</strong>
              </div>
              <div>
                <span>Always on</span>
                <strong>Publishing system</strong>
              </div>
            </div>

            <div className="products">
              <article className="product-card product-card--studio">
                <div className="product-card-bg" />
                <div className="product-card-glow" />
                <div className="product-copy">
                  <div className="product-head">
                    <div>
                      <div className="product-num">01</div>
                      <h3 className="product-title">Content Creator Studio</h3>
                    </div>
                    <div className="product-pills">
                      <span className="pill pill-live">
                        <span className="pill-dot" /> Launching at Trailer 3
                      </span>
                      <span className="pill pill-flagship">Flagship</span>
                    </div>
                  </div>
                  <p className="product-desc">
                    Paste a trailer, leak, or news URL. Walk away with a script,
                    hooks, titles, thumbnail concepts, Shorts cuts, and SEO tags
                    built for GTA channels that need to ship immediately.
                  </p>
                  <ul className="feature-list">
                    <li><CheckIcon /> Long-form scripts with retention beats</li>
                    <li><CheckIcon /> Title, hook, and thumbnail variants</li>
                    <li><CheckIcon /> Short-form clip plans for every drop</li>
                    <li><CheckIcon /> SEO tags mapped to live creator demand</li>
                  </ul>
                </div>

                <div className="product-visual product-visual--studio" aria-hidden="true">
                  <div className="visual-chrome">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="visual-kicker">Input</div>
                  <div className="visual-url">trailer-breakdown.mp4</div>
                  <div className="visual-flow">
                    <span>Script</span>
                    <span>Hooks</span>
                    <span>Clips</span>
                  </div>
                  <div className="visual-output">
                    <div>8:42 video plan</div>
                    <strong>87%</strong>
                  </div>
                </div>

                <div className="product-foot">
                  <div className="price-block">
                    <div className="price-amount">
                      $29<span className="price-unit"> – $79 / mo</span>
                    </div>
                    <div className="price-note">Creator, Studio, and Agency tiers</div>
                  </div>
                  <button
                    type="button"
                    className="btn-card"
                    onClick={() => setWishlistOpen(true)}
                  >
                    Get notified <ArrowIcon size={14} />
                  </button>
                </div>
              </article>

              <article className="product-card product-card--intel">
                <div className="product-card-bg product-card-bg--cyan" />
                <div className="product-card-glow product-card-glow--cyan" />
                <div className="product-copy">
                  <div className="product-head">
                    <div>
                      <div className="product-num product-num--cyan">02</div>
                      <h3 className="product-title">Twitch &amp; YouTube Trend Dashboard</h3>
                    </div>
                    <div className="product-pills">
                      <span className="pill pill-live pill-live--cyan">
                        <span className="pill-dot" /> Real-time intel
                      </span>
                    </div>
                  </div>
                  <p className="product-desc">
                    A live view of which GTA VI topics, keywords, thumbnails, and
                    stream moments are breaking out, before the algorithm turns
                    the opportunity into old news.
                  </p>
                  <ul className="feature-list">
                    <li><CheckIcon /> Topic heatmaps across YouTube and Twitch</li>
                    <li><CheckIcon /> Thumbnail and title benchmark tracking</li>
                    <li><CheckIcon /> Streamer leaderboards and clip alerts</li>
                    <li><CheckIcon /> Weekly breakout reports for teams</li>
                  </ul>
                </div>

                <div className="product-visual product-visual--intel" aria-hidden="true">
                  <div className="visual-chrome">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="trend-bars">
                    <span style={{ height: "42%" }} />
                    <span style={{ height: "68%" }} />
                    <span style={{ height: "54%" }} />
                    <span style={{ height: "86%" }} />
                    <span style={{ height: "72%" }} />
                  </div>
                  <div className="trend-row">
                    <span>Vice City map leak</span>
                    <strong>+318%</strong>
                  </div>
                  <div className="trend-row">
                    <span>Trailer frame analysis</span>
                    <strong>+204%</strong>
                  </div>
                </div>

                <div className="product-foot">
                  <div className="price-block">
                    <div className="price-amount">
                      $39<span className="price-unit"> / mo</span>
                    </div>
                    <div className="price-note">Unlimited seats for creator teams</div>
                  </div>
                  <button
                    type="button"
                    className="btn-card"
                    onClick={() => setWishlistOpen(true)}
                  >
                    Get notified <ArrowIcon size={14} />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section className="block contact-block" id="contact">
        <div className="contact-glow contact-glow--cyan" />
        <div className="contact-glow contact-glow--pink" />
        <div className="page-pad">
          <div className="contact-banner" aria-hidden="true">
            <span>Creator stack</span>
            <span>Trend intel</span>
            <span>Launch systems</span>
          </div>
          <div className="contact-wrap">
            <div className="contact-left">
              <div className="section-eyebrow">
                <SparkIcon size={12} /> Get in touch
              </div>
              <h2 className="section-title">
                Building in the GTA economy? <span className="title-accent">Talk to us.</span>
              </h2>
              <p className="contact-desc">
                Creators, agencies, investors, and operators can reach us here.
                We are moving fast and looking for serious early partners.
              </p>
              <a className="contact-email" href="mailto:hello@leonidalabs.com">
                hello@leonidalabs.com
                <ArrowIcon size={14} />
              </a>
            </div>

            <form onSubmit={handleContact} className="contact-form">
              <div className="contact-form-bg" />
              <div className="field">
                <label>Name</label>
                <input type="text" required placeholder="Your name" />
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" required placeholder="you@domain.com" />
              </div>
              <div className="field">
                <label>Message</label>
                <textarea required placeholder="What's on your mind?" />
              </div>
              <button className="btn-primary full" type="submit">
                Send message <ArrowIcon size={15} />
              </button>
              {contactSent && (
                <div className="toast">
                  <CheckIcon /> Got it. We&apos;ll reply soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="site-footer">
        <div className="footer-glow" />
        <div className="page-pad">
          <div className="footer-top">
              <div className="footer-brand">
                <p className="footer-tag">
                Creator software and real-time intelligence for the GTA VI launch cycle.
                </p>
              </div>

            <div className="footer-cols">
              <div className="footer-col">
                <div className="footer-col-title">Product</div>
                <a href="#products">Creator Studio</a>
                <a href="#products">Trend Dashboard</a>
                <a href="#contact">Pricing</a>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Company</div>
                <a href="#contact">Contact</a>
                <a href="mailto:hello@leonidalabs.com">Email us</a>
                <a href="#top">Back to top</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© 2026 Leonida Labs. All rights reserved.</div>
            <div className="disc">
              Not affiliated with, endorsed by, or sponsored by Rockstar Games or
              Take-Two Interactive. Grand Theft Auto and GTA VI are trademarks of
              their respective owners.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
