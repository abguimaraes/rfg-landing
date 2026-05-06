import type { Metadata } from 'next';

import { LegalLayout } from '@/components/sections/LegalLayout';
import { footer } from '@/content/footer';

export const metadata: Metadata = {
  title: 'Termos de Uso — RFG Corretora de Seguros',
  description:
    'Termos e condições de uso do site institucional da RFG Corretora de Seguros — Maceió/AL.',
  alternates: { canonical: '/termos-de-uso' },
  robots: { index: true, follow: true },
};

export default function TermosDeUsoPage(): React.ReactNode {
  return (
    <LegalLayout
      eyebrow="Documento Legal"
      headline="Termos de Uso"
      subheadline="Última atualização: 6 de maio de 2026."
    >
      <p>
        Estes Termos de Uso (&ldquo;Termos&rdquo;) regem o acesso e uso do
        site institucional da RFG Corretora de Seguros (&ldquo;RFG&rdquo;,
        &ldquo;nós&rdquo;), disponível em{' '}
        <a href="https://www.rfgcorretora.com.br">www.rfgcorretora.com.br</a>.
        Ao acessar ou usar o site, você concorda com estes Termos.
      </p>

      <h2>1. Sobre a RFG</h2>
      <p>
        A RFG é corretora de seguros com registro SUSEP ativo desde 1995,
        atuando em Maceió/AL na intermediação de produtos de seguros,
        consórcios, previdência privada e responsabilidade civil
        profissional.
      </p>

      <h2>2. Natureza informacional do site</h2>
      <p>
        Este site tem caráter <strong>institucional e informativo</strong>.
        As informações apresentadas — incluindo descrições de coberturas,
        mecanismos como o &ldquo;Diagnóstico de Ângulo Morto Patrimonial&rdquo;,
        depoimentos de clientes e referências a produtos — são para fins
        ilustrativos.
      </p>
      <p>
        O conteúdo do site <strong>não constitui</strong>:
      </p>
      <ul>
        <li>Oferta vinculante de produto, plano ou cobertura.</li>
        <li>
          Contrato de seguro, consórcio, previdência ou qualquer outro
          instrumento financeiro.
        </li>
        <li>
          Aconselhamento financeiro, jurídico ou tributário individualizado.
        </li>
      </ul>
      <p>
        A contratação efetiva de qualquer produto exige análise individual,
        documentação específica e formalização contratual junto à seguradora
        ou administradora competente, sempre intermediada pela RFG.
      </p>

      <h2>3. Uso permitido</h2>
      <p>
        Você pode acessar e navegar pelo site para fins pessoais e não
        comerciais. É <strong>vedado</strong>:
      </p>
      <ul>
        <li>Reproduzir, distribuir ou modificar o conteúdo sem autorização.</li>
        <li>
          Usar o site para qualquer finalidade ilegal ou que viole direitos
          de terceiros.
        </li>
        <li>
          Tentar acessar áreas restritas, comprometer a segurança ou
          interferir no funcionamento do site.
        </li>
        <li>
          Coletar informações dos usuários por meios automatizados (scraping,
          bots, etc) sem autorização expressa.
        </li>
      </ul>

      <h2>4. Propriedade intelectual</h2>
      <p>
        Todo o conteúdo do site — textos, imagens, gráficos, logotipos,
        ícones, vídeos, código-fonte e arranjo — é de propriedade da RFG ou
        licenciado para seu uso, e está protegido por leis de direitos
        autorais, marcas e demais legislações aplicáveis.
      </p>
      <p>
        A marca &ldquo;RFG Corretora de Seguros&rdquo; e os mecanismos
        proprietários como &ldquo;Diagnóstico de Ângulo Morto Patrimonial&rdquo;
        são de propriedade exclusiva da RFG.
      </p>

      <h2>5. Depoimentos de clientes</h2>
      <p>
        Os depoimentos exibidos são reais e foram fornecidos com autorização
        dos respectivos clientes. Refletem experiências individuais e não
        constituem promessa de resultado igual para outros usuários.
      </p>

      <h2>6. Links externos</h2>
      <p>
        O site pode conter links para sites de terceiros (seguradoras,
        WhatsApp, Instagram, parceiros). Não nos responsabilizamos pelo
        conteúdo, políticas de privacidade ou práticas desses sites.
      </p>

      <h2>7. Limitação de responsabilidade</h2>
      <p>
        Nos esforçamos para manter o site atualizado e disponível, mas não
        garantimos:
      </p>
      <ul>
        <li>Disponibilidade ininterrupta ou ausência de erros técnicos.</li>
        <li>
          Adequação do conteúdo a fins específicos não previstos
          institucionalmente.
        </li>
        <li>
          Resultados de qualquer cotação, simulação ou análise apresentada
          como referência informacional.
        </li>
      </ul>
      <p>
        A RFG não responde por danos decorrentes de uso indevido do site,
        falhas de conexão do usuário ou interpretação equivocada de
        informações de caráter ilustrativo.
      </p>

      <h2>8. Privacidade e dados pessoais</h2>
      <p>
        O tratamento de dados pessoais é regido pela nossa{' '}
        <a href="/politica-de-privacidade">Política de Privacidade</a>, que
        integra estes Termos.
      </p>

      <h2>9. Modificações</h2>
      <p>
        Podemos modificar estes Termos a qualquer momento. Mudanças
        substantivas serão comunicadas por banner no site. O uso continuado
        após a publicação configura aceitação dos novos Termos.
      </p>

      <h2>10. Lei aplicável e foro</h2>
      <p>
        Estes Termos são regidos pela legislação brasileira. Eventuais
        litígios serão dirimidos no foro da Comarca de Maceió/AL, com
        renúncia a qualquer outro por mais privilegiado que seja.
      </p>

      <h2>11. Contato</h2>
      <p>
        Dúvidas sobre estes Termos? Fale com a gente:
      </p>
      <ul>
        <li>
          <strong>E-mail:</strong>{' '}
          <a href={footer.contact.emailHref}>{footer.contact.email}</a>
        </li>
        <li>
          <strong>Telefone:</strong>{' '}
          <a href={footer.contact.phoneHref}>{footer.contact.phone}</a>
        </li>
        <li>
          <strong>WhatsApp:</strong>{' '}
          <a
            href={footer.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {footer.contact.whatsapp}
          </a>
        </li>
      </ul>
    </LegalLayout>
  );
}
