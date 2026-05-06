import type { Metadata } from 'next';

import { LegalLayout } from '@/components/sections/LegalLayout';
import { footer } from '@/content/footer';

export const metadata: Metadata = {
  title: 'Política de Privacidade — RFG Corretora de Seguros',
  description:
    'Como a RFG Corretora coleta, usa e protege seus dados pessoais. Política em conformidade com a LGPD (Lei 13.709/2018).',
  alternates: { canonical: '/politica-de-privacidade' },
  robots: { index: true, follow: true },
};

export default function PoliticaDePrivacidadePage(): React.ReactNode {
  return (
    <LegalLayout
      eyebrow="Documento Legal"
      headline="Política de Privacidade"
      subheadline="Última atualização: 6 de maio de 2026 — em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018)."
    >
      <p>
        A RFG Corretora de Seguros (&ldquo;RFG&rdquo;, &ldquo;nós&rdquo;) leva a
        sério a privacidade dos seus dados. Esta política descreve como
        coletamos, usamos, compartilhamos e protegemos as informações pessoais
        que você nos confia ao visitar nosso site ou contratar nossos
        serviços.
      </p>

      <h2>1. Quem somos (Controlador dos Dados)</h2>
      <p>
        <strong>RFG Corretora de Seguros</strong> — registro SUSEP ativo desde
        1995, atuando em Maceió/AL. Contato:
      </p>
      <ul>
        <li>
          <strong>Endereço:</strong> {footer.contact.address}
        </li>
        <li>
          <strong>E-mail:</strong>{' '}
          <a href={footer.contact.emailHref}>{footer.contact.email}</a>
        </li>
        <li>
          <strong>Telefone:</strong>{' '}
          <a href={footer.contact.phoneHref}>{footer.contact.phone}</a>
        </li>
      </ul>

      <h2>2. Quais dados coletamos</h2>
      <h3>2.1 Dados que você fornece</h3>
      <ul>
        <li>
          <strong>Identificação:</strong> nome, CPF/CNPJ, data de nascimento.
        </li>
        <li>
          <strong>Contato:</strong> e-mail, telefone, endereço.
        </li>
        <li>
          <strong>Patrimoniais:</strong> dados de bens segurados (veículo,
          imóvel, renda) — apenas quando você inicia um diagnóstico ou
          contrata cobertura.
        </li>
        <li>
          <strong>Conteúdo de comunicação:</strong> mensagens enviadas via
          WhatsApp, e-mail ou formulário de contato.
        </li>
      </ul>

      <h3>2.2 Dados coletados automaticamente</h3>
      <ul>
        <li>
          <strong>Dados de navegação:</strong> endereço IP, tipo de navegador,
          páginas visitadas, tempo de permanência.
        </li>
        <li>
          <strong>Cookies:</strong> conforme banner de consentimento (analytics
          via Google Analytics 4 com IP anonimizado e marketing via Meta
          Pixel, ambos opt-in).
        </li>
      </ul>

      <h2>3. Para que usamos seus dados (Finalidade)</h2>
      <ul>
        <li>
          <strong>Atendimento:</strong> responder solicitações de diagnóstico,
          orçamento e suporte.
        </li>
        <li>
          <strong>Execução de contrato:</strong> intermediar contratação de
          seguros junto às seguradoras parceiras.
        </li>
        <li>
          <strong>Cumprimento legal:</strong> atender obrigações da SUSEP,
          Receita Federal e demais órgãos reguladores.
        </li>
        <li>
          <strong>Marketing (com consentimento):</strong> enviar
          comunicações sobre nossos serviços e campanhas relevantes.
        </li>
        <li>
          <strong>Análise:</strong> melhorar a experiência do site via
          estatísticas anônimas de uso.
        </li>
      </ul>

      <h2>4. Base legal (Art. 7º LGPD)</h2>
      <ul>
        <li>
          <strong>Consentimento</strong> — para cookies não essenciais e
          marketing direto.
        </li>
        <li>
          <strong>Execução de contrato</strong> — para prestação dos serviços
          de corretagem.
        </li>
        <li>
          <strong>Cumprimento de obrigação legal/regulatória</strong> — para
          retenção de dados exigida por SUSEP, Receita Federal etc.
        </li>
        <li>
          <strong>Legítimo interesse</strong> — para análise de uso do site,
          prevenção de fraude e segurança da informação.
        </li>
      </ul>

      <h2>5. Com quem compartilhamos</h2>
      <p>
        Compartilhamos seus dados apenas quando estritamente necessário e
        sempre com salvaguardas adequadas:
      </p>
      <ul>
        <li>
          <strong>Seguradoras parceiras</strong> — para cotação e contratação
          de apólices em seu nome.
        </li>
        <li>
          <strong>Provedores de tecnologia</strong> — hospedagem (Vercel),
          analytics (Google), comunicação (Meta/WhatsApp Business),
          rigorosamente sob acordo de processamento.
        </li>
        <li>
          <strong>Autoridades</strong> — quando exigido por lei, ordem
          judicial ou requisição regulatória (SUSEP).
        </li>
      </ul>
      <p>
        <strong>Não vendemos seus dados.</strong> Em nenhuma circunstância
        compartilhamos suas informações com terceiros para fins comerciais
        próprios deles.
      </p>

      <h2>6. Seus direitos (Art. 18 LGPD)</h2>
      <p>
        Você pode exercer os seguintes direitos a qualquer momento, sem custo:
      </p>
      <ul>
        <li>
          <strong>Confirmação e acesso</strong> aos seus dados.
        </li>
        <li>
          <strong>Correção</strong> de dados incompletos, inexatos ou
          desatualizados.
        </li>
        <li>
          <strong>Anonimização, bloqueio ou eliminação</strong> de dados
          desnecessários ou tratados em desconformidade.
        </li>
        <li>
          <strong>Portabilidade</strong> dos dados a outro fornecedor.
        </li>
        <li>
          <strong>Revogação do consentimento</strong> a qualquer momento.
        </li>
        <li>
          <strong>Informação</strong> sobre as entidades públicas e privadas
          com quem compartilhamos seus dados.
        </li>
      </ul>
      <p>
        Para exercer qualquer desses direitos, envie um e-mail para{' '}
        <a href={footer.contact.emailHref}>{footer.contact.email}</a> com o
        assunto &ldquo;LGPD — exercício de direito&rdquo;. Responderemos em até
        15 dias úteis.
      </p>

      <h2>7. Retenção dos dados</h2>
      <p>
        Mantemos seus dados pelo prazo necessário ao cumprimento das
        finalidades acima. Para clientes ativos, durante toda a vigência do
        contrato. Após o término, retemos pelos prazos legais aplicáveis (em
        geral 5 anos para fins fiscais e regulatórios SUSEP), salvo
        determinação legal específica.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Usamos três categorias de cookies:
      </p>
      <ul>
        <li>
          <strong>Necessários</strong> (sempre ativos) — funcionamento básico
          do site, sem coleta de dados pessoais identificáveis.
        </li>
        <li>
          <strong>Analytics</strong> (opt-in) — Google Analytics 4 com IP
          anonimizado, mede uso agregado.
        </li>
        <li>
          <strong>Marketing</strong> (opt-in) — Meta Pixel para mensuração de
          campanhas e remarketing.
        </li>
      </ul>
      <p>
        Você gerencia suas preferências pelo banner de consentimento que
        aparece em sua primeira visita. Para alterar depois, limpe os cookies
        do navegador para esta página e o banner reaparece.
      </p>

      <h2>9. Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais adequadas para proteger
        seus dados: criptografia em trânsito (HTTPS), controles de acesso,
        políticas internas de manuseio de informações sensíveis e auditoria
        regular dos provedores. Em caso de incidente de segurança que possa
        gerar risco relevante aos titulares, notificaremos a ANPD e os
        afetados conforme prazos legais.
      </p>

      <h2>10. Encarregado pelo Tratamento de Dados (DPO)</h2>
      <p>
        Para dúvidas, reclamações ou exercício de direitos, fale com nosso
        Encarregado pelo e-mail{' '}
        <a href={footer.contact.emailHref}>{footer.contact.email}</a>.
      </p>

      <h2>11. Atualizações desta política</h2>
      <p>
        Esta política pode ser atualizada periodicamente. Mudanças
        substantivas serão comunicadas por banner no site ou e-mail aos
        clientes ativos. A data da última atualização aparece no topo deste
        documento.
      </p>

      <h2>12. Foro</h2>
      <p>
        Esta política é regida pela legislação brasileira, em especial pela
        LGPD (Lei 13.709/2018). Eventuais litígios serão dirimidos no foro
        de Maceió/AL, com renúncia a qualquer outro por mais privilegiado que
        seja.
      </p>
    </LegalLayout>
  );
}
