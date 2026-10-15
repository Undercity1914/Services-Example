import { useEffect, useRef, useState } from 'react';
import heroImage from '../../assets/SalaAconchegante.png';
import {
  ArrowRight,
  Heart,
  Laptop,
  Leaf,
  MapPin,
  Menu,
  Minus,
  Plus,
  Signpost,
  Sprout,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa6';

type NavItem = { label: string; href: string };
type FeatureItem = { title: string; description: string; icon: LucideIcon };
type FaqItem = { question: string; answer: string };

type FormState = {
  name: string;
  email: string;
  preference: 'online' | 'presencial' | '';
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const navItems: NavItem[] = [
  { label: 'Início', href: '#inicio' },
  { label: 'Atendimento', href: '#atendimento' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Dúvidas', href: '#duvidas' },
  { label: 'Contato', href: '#contato' },
];

const featureItems: FeatureItem[] = [
  {
    title: 'Escuta acolhedora',
    description: 'Um espaço seguro para você ser quem é.',
    icon: Heart,
  },
  {
    title: 'Atendimento individual',
    description: 'Foco nas suas necessidades e no seu momento de vida.',
    icon: Users,
  },
  {
    title: 'Online e presencial',
    description: 'Flexibilidade para a sua rotina, com a mesma qualidade de cuidado.',
    icon: Laptop,
  },
];

const serviceItems: FeatureItem[] = [
  {
    title: 'Atendimento individual',
    description:
      'Um processo terapêutico construído a partir das suas demandas, no seu tempo e com total confidencialidade.',
    icon: UserRound,
  },
  {
    title: 'Desenvolvimento pessoal',
    description:
      'Um espaço para se conhecer melhor, explorar suas necessidades e refletir sobre suas escolhas.',
    icon: Sprout,
  },
  {
    title: 'Apoio em momentos de mudança',
    description:
      'Acolhimento para lidar com novas fases, transições e desafios da vida.',
    icon: Signpost,
  },
];

const faqItems: FaqItem[] = [
  {
    question: 'Como funciona o atendimento online?',
    answer:
      'O atendimento acontece por videochamada. É necessário um dispositivo com internet e um local reservado para conversar. Os detalhes são combinados no primeiro contato.',
  },
  {
    question: 'Posso escolher atendimento presencial?',
    answer:
      'A modalidade pode ser combinada no primeiro contato, conforme a disponibilidade do atendimento.',
  },
  {
    question: 'Como agendar uma conversa?',
    answer:
      'Clique em “Agendar uma conversa” para conhecer o fluxo demonstrativo de contato.',
  },
  {
    question: 'Como saber qual atendimento escolher?',
    answer:
      'A conversa inicial permite esclarecer suas dúvidas e conhecer as possibilidades de atendimento.',
  },
];

const socialLinks = {
  instagram: '',
  whatsapp: '',
};

const emptyFormState: FormState = {
  name: '',
  email: '',
  preference: '',
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formState, setFormState] = useState<FormState>(emptyFormState);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = 'hidden';
    firstInputRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setConfirmationMessage('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    triggerRef.current?.focus();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
    setFormErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};

    if (!formState.name.trim()) {
      nextErrors.name = 'Informe o seu nome.';
    }

    if (!formState.email.trim()) {
      nextErrors.email = 'Informe o seu e-mail.';
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      nextErrors.email = 'Digite um e-mail válido.';
    }

    if (!formState.preference) {
      nextErrors.preference = 'Selecione a preferência.';
    }

    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setConfirmationMessage('Demonstração concluída. Nenhum agendamento foi realizado.');
    setFormState(emptyFormState);
    setFormErrors({});
  };

  const isPreview =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('preview') === '1';

  if (isPreview) {
    return (
      <div className="flex min-h-[520px] items-center justify-center bg-[#FAF7F2] p-6 text-[#172C36]">
        <div className="w-full max-w-[720px] overflow-hidden rounded-[28px] border border-[#e8d7ca] bg-white shadow-[0_16px_45px_rgba(23,44,54,0.08)]">
          <div className="flex items-center justify-between border-b border-[#f0e7e0] bg-[#F8E9DF] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#AF6548]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#d7b5a5]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#d7b5a5]" />
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#5c6c77]">
              Clara — Psicologia
            </span>
          </div>
          <div className="grid gap-6 p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
            <div className="space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#AF6548]">
                Um espaço de escuta
              </p>
              <h2
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                className="text-3xl leading-tight text-[#172C36] md:text-4xl"
              >
                Mais bem-estar para a sua rotina
              </h2>
              <p className="text-sm leading-6 text-[#4d5f6a]">
                Atendimento psicológico online e presencial, com acolhimento e respeito à sua história.
              </p>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#AF6548] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#976247]"
              >
                Agendar uma conversa
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="overflow-hidden rounded-[22px] border border-[#eeded2] bg-[#F8E9DF] p-3">
              <div className="h-full min-h-[220px] rounded-[18px] bg-[radial-gradient(circle_at_top,_#f9efe8,_#f4e2d7_45%,_#d8cfbf)]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#172C36]">
      <header id="inicio" className="border-b border-[#e9dcce] bg-[#FAF7F2]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3" aria-label="Voltar para início">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e8d4c6] bg-[#F8E9DF] text-sm font-bold text-[#AF6548]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              C
            </span>
            <span
              className="text-lg font-semibold tracking-tight text-[#172C36]"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Clara — Psicologia
            </span>
          </a>

          <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm font-medium text-[#3f4f5b] transition hover:text-[#172C36]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 lg:block">
            <button
              type="button"
              ref={triggerRef}
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#AF6548] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_18px_rgba(175,101,72,0.18)] transition hover:bg-[#966145]"
            >
              Agendar uma conversa
              <ArrowRight size={16} />
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[#e5d4c7] bg-white p-2 text-[#172C36] lg:hidden"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="border-t border-[#eadfd2] bg-[#FAF7F2] px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-base font-medium text-[#3f4f5b]"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  handleOpenModal();
                }}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#AF6548] px-4 py-2.5 text-sm font-semibold text-white"
              >
                Agendar uma conversa
                <ArrowRight size={16} />
              </button>
            </nav>
          </div>
        )}
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:py-20">
          <div className="order-2 lg:order-1">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#AF6548]">
              Um espaço de escuta
            </p>
            <h1
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              className="max-w-xl text-4xl leading-[1.08] tracking-[-0.04em] text-[#172C36] sm:text-5xl lg:text-6xl"
            >
              Mais bem-estar para a sua rotina
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#4d5f6a] sm:text-lg">
              Atendimento psicológico online e presencial, com acolhimento e respeito à sua história.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                ref={triggerRef}
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2 rounded-full bg-[#AF6548] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(175,101,72,0.2)] transition hover:bg-[#956244]"
              >
                Agendar uma conversa
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#ebd8ca] bg-[#F8E9DF] px-4 py-2.5 text-sm text-[#2d4a56]">
              <MapPin size={16} className="text-[#AF6548]" />
              <span>Online e presencial</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-[2rem] border border-[#edd9cb] bg-[#F8E9DF] p-3 shadow-[0_20px_30px_rgba(23,44,54,0.05)]">
              <img
                src={heroImage}
                alt="Consultório acolhedor com poltrona, plantas e iluminação natural"
                className="h-[420px] w-full rounded-[1.5rem] object-cover sm:h-[500px]"
              />
            </div>
          </div>
        </section>


        <section className="border-y border-[#eadfd2] bg-[#F8E9DF] py-4">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
            {featureItems.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-[1.5rem] border border-[#ecd8c8] bg-[#FAF7F2] p-5 shadow-[0_8px_24px_rgba(23,44,54,0.02)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F8E9DF] text-[#AF6548]">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#172C36]">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#536877]">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="atendimento" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#AF6548]">Atendimento</p>
            <h2
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              className="mt-4 text-3xl text-[#172C36] sm:text-4xl"
            >
              Como posso ajudar você?
            </h2>
            <p className="mt-4 text-base leading-7 text-[#556b77]">
              Um espaço para cuidar de você, com escuta, presença e respeito.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {serviceItems.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="flex h-full flex-col rounded-[1.75rem] border border-[#ead7c9] bg-[#FAF7F2] p-7 shadow-[0_12px_28px_rgba(23,44,54,0.04)]"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#F8E9DF] text-[#AF6548]">
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <h3 className="text-2xl font-semibold text-[#172C36]">{title}</h3>
                <p className="mt-4 text-base leading-7 text-[#536877]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#F8E9DF] py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#AF6548]">Passo a passo</p>
              <h2
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                className="mt-4 text-3xl text-[#172C36] sm:text-4xl"
              >
                Como funciona o atendimento
              </h2>
              <p className="mt-4 text-base leading-7 text-[#556b77]">
                Um processo simples, pensado para que você se sinta à vontade desde o início.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {[
                {
                  number: '01',
                  title: 'Primeiro contato',
                  description:
                    'Você entra em contato para agendar uma conversa e tirar suas primeiras dúvidas.',
                },
                {
                  number: '02',
                  title: 'Conversa inicial',
                  description:
                    'Vamos conversar sobre suas demandas, entender suas necessidades e combinar os detalhes do atendimento.',
                },
                {
                  number: '03',
                  title: 'Acompanhamento',
                  description:
                    'O atendimento segue de forma personalizada, respeitando seu tempo e suas necessidades.',
                },
              ].map((item) => (
                <div key={item.number} className="rounded-[1.75rem] border border-[#e9d4c4] bg-[#FAF7F2] p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#AF6548]">{item.number}</p>
                  <h3 className="mt-5 text-2xl font-semibold text-[#172C36]">{item.title}</h3>
                  <p className="mt-4 text-base leading-7 text-[#536877]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#AF6548]">Sobre</p>
            <h2
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              className="mt-4 max-w-md text-3xl text-[#172C36] sm:text-4xl"
            >
              Cada história merece ser ouvida
            </h2>
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-8 text-[#465c68]">
              Olá, eu sou a Clara. Acredito no valor de um espaço de escuta para refletir sobre sua história, suas necessidades e o que importa para você.
            </p>
            <p className="text-lg leading-8 text-[#465c68]">
              Uma abordagem que valoriza sua individualidade, seu tempo e suas necessidades.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-[1.25rem] border border-[#ebd8ca] bg-[#F8E9DF] p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF7F2] text-[#AF6548]">
                  <Heart size={18} strokeWidth={1.8} />
                </div>
                <span className="text-base font-medium text-[#172C36]">Respeito à sua história</span>
              </div>
              <div className="flex items-center gap-3 rounded-[1.25rem] border border-[#ebd8ca] bg-[#F8E9DF] p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF7F2] text-[#AF6548]">
                  <Leaf size={18} strokeWidth={1.8} />
                </div>
                <span className="text-base font-medium text-[#172C36]">Espaço de acolhimento</span>
              </div>
            </div>
          </div>
        </section>

        <section id="duvidas" className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              className="text-3xl text-[#172C36] sm:text-4xl"
            >
              Tire suas dúvidas
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqItems.map(({ question, answer }, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={question} className="overflow-hidden rounded-[1.25rem] border border-[#e9d7ca] bg-[#FAF7F2] shadow-[0_10px_24px_rgba(23,44,54,0.02)]">
                  <details open={isOpen} onToggle={(event) => {
                    const target = event.currentTarget as HTMLDetailsElement;
                    setOpenFaq(target.open ? index : null);
                  }}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-[#172C36] sm:px-6">
                      <span>{question}</span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8E9DF] text-[#AF6548]">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-base leading-7 text-[#536877] sm:px-6">
                      {answer}
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        </section>

        <section id="contato" className="bg-[#AF6548] py-16 text-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-2xl">
              <h2
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                className="text-3xl sm:text-4xl"
              >
                Vamos conversar?
              </h2>
              <p className="mt-3 text-base leading-7 text-[#f5dfd4]">
                Entre em contato para conhecer o atendimento e esclarecer suas dúvidas.
              </p>
            </div>

            <button
              type="button"
              ref={triggerRef}
              onClick={handleOpenModal}
              className="inline-flex items-center gap-2 self-start rounded-full bg-[#FAF7F2] px-6 py-3 text-sm font-semibold text-[#172C36] shadow-[0_12px_30px_rgba(23,44,54,0.12)] transition hover:bg-[#f0e7df] lg:self-auto"
            >
              Agendar uma conversa
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#eadfd2] bg-[#FAF7F2]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8d5c6] bg-[#F8E9DF] text-sm font-bold text-[#AF6548]"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                C
              </span>
              <span className="text-lg font-semibold text-[#172C36]">Clara — Psicologia</span>
            </div>
            <p className="mt-4 max-w-sm text-base leading-7 text-[#536877]">Mais presença para a sua história.</p>
          </div>

          <nav aria-label="Navegação no rodapé" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-[#3c4d5a] transition hover:text-[#172C36]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7d7ca] bg-[#F8E9DF] text-[#172C36]"
              >
                <FaInstagram size={18} />
              </a>
            )}
            {socialLinks.whatsapp && (
              <a
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7d7ca] bg-[#F8E9DF] text-[#172C36]"
              >
                <FaWhatsapp size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="border-t border-[#eadfd2] bg-[#FAF7F2] py-5">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-center text-sm text-[#596f7d] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <p>© 2026 Clara — Psicologia. Todos os direitos reservados.</p>
            <p>Página demonstrativa • Profissional fictícia</p>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172C36]/60 p-4">
          <div
            className="w-full max-w-xl rounded-[2rem] border border-[#ebdccd] bg-[#FAF7F2] p-6 shadow-[0_28px_60px_rgba(23,44,54,0.24)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#AF6548]">Demonstrativo</p>
                <h3 id="modal-title" className="mt-2 text-2xl font-semibold text-[#172C36]">
                  Agendar uma conversa
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-full border border-[#e9d5c5] bg-white p-2 text-[#172C36]"
                aria-label="Fechar modal"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-4 text-base leading-7 text-[#536877]">
              Esta é uma demonstração. Os dados não serão enviados.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#172C36]">
                  Nome
                </label>
                <input
                  id="name"
                  ref={firstInputRef}
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-[#e8d4c7] bg-white px-4 py-3 text-base text-[#172C36] outline-none transition focus:border-[#AF6548] focus:ring-2 focus:ring-[#f0c8b0]"
                  aria-invalid={Boolean(formErrors.name)}
                />
                {formErrors.name && <p className="mt-1 text-sm text-[#b84f45]">{formErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#172C36]">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-[#e8d4c7] bg-white px-4 py-3 text-base text-[#172C36] outline-none transition focus:border-[#AF6548] focus:ring-2 focus:ring-[#f0c8b0]"
                  aria-invalid={Boolean(formErrors.email)}
                />
                {formErrors.email && <p className="mt-1 text-sm text-[#b84f45]">{formErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="preference" className="mb-2 block text-sm font-medium text-[#172C36]">
                  Preferência
                </label>
                <select
                  id="preference"
                  name="preference"
                  value={formState.preference}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-[#e8d4c7] bg-white px-4 py-3 text-base text-[#172C36] outline-none transition focus:border-[#AF6548] focus:ring-2 focus:ring-[#f0c8b0]"
                  aria-invalid={Boolean(formErrors.preference)}
                >
                  <option value="">Selecione</option>
                  <option value="online">Online</option>
                  <option value="presencial">Presencial</option>
                </select>
                {formErrors.preference && (
                  <p className="mt-1 text-sm text-[#b84f45]">{formErrors.preference}</p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#AF6548] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#966145]"
              >
                Testar agendamento
                <ArrowRight size={16} />
              </button>

              {confirmationMessage && (
                <p className="rounded-xl border border-[#d9e7d8] bg-[#edf6ee] px-4 py-3 text-sm font-medium text-[#215f39]">
                  {confirmationMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
