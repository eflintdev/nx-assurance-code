import { Component, Prop, h } from '@stencil/core';
import './app-footer.css';

@Component({
  tag: 'app-footer',
  styleUrl: 'app-footer.css',
  shadow: true,
})
export class AppFooter {
  /**
   * Company name
   */
  @Prop() companyName = 'Plymouth Rock Assurance';

  /**
   * Phone number for quote
   */
  @Prop() phone = '800-516-9242';

  /**
   * Footer links
   */
  @Prop() links: Array<{ label: string; href: string }> = [
    { label: 'Home', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Privacy & Security', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'States Licensed & Disclaimers', href: '#' },
    { label: 'Site Map', href: '#' },
  ];

  /**
   * Social media links
   */
  @Prop() socialLinks: Array<{ platform: string; url: string }> = [
    { platform: 'Facebook', url: '#' },
    { platform: 'Twitter', url: '#' },
    { platform: 'Instagram', url: '#' },
    { platform: 'LinkedIn', url: '#' },
  ];

  private getSocialIcon(platform: string) {
    const iconMap = {
      'Facebook': (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
          <path d="M8.31107 0C6.81282 0 5.51856 0.474173 4.61011 1.41109C3.70165 2.34801 3.20703 3.72124 3.20703 5.40656V7.61006H0.458147C0.336643 7.61007 0.220118 7.66019 0.134202 7.74938C0.0482852 7.83858 1.21486e-05 7.95955 0 8.08569V11.8907C1.21486e-05 12.0169 0.0482852 12.1378 0.134202 12.227C0.220118 12.3162 0.336643 12.3663 0.458147 12.3663H3.20703V21.4033C3.20704 21.5294 3.25531 21.6504 3.34123 21.7396C3.42715 21.8288 3.54367 21.8789 3.66518 21.8789H7.33035C7.45186 21.8789 7.56838 21.8288 7.6543 21.7396C7.74022 21.6504 7.78849 21.5294 7.7885 21.4033V12.3663H10.9955C11.1071 12.3663 11.2149 12.3241 11.2986 12.2474C11.3823 12.1708 11.4361 12.0651 11.4501 11.9502L11.9082 8.14514C11.9164 8.07819 11.9107 8.01021 11.8915 7.94572C11.8724 7.88123 11.8403 7.82171 11.7973 7.7711C11.7543 7.72049 11.7014 7.67996 11.6422 7.65219C11.5829 7.62443 11.5187 7.61006 11.4537 7.61006H7.7885V5.70754C7.7885 5.17642 8.1932 4.75629 8.70479 4.75629H11.4537C11.5752 4.75627 11.6917 4.70616 11.7776 4.61696C11.8635 4.52777 11.9118 4.4068 11.9118 4.28066V0.640055C11.9117 0.524789 11.8712 0.413497 11.798 0.326868C11.7248 0.240238 11.6237 0.184165 11.5136 0.169071C11.1088 0.113305 9.64728 0 8.31107 0ZM8.31107 0.951257C9.42797 0.951257 10.5077 1.04403 10.9955 1.09153V3.80503H8.70479C7.69809 3.80503 6.87221 4.66243 6.87221 5.70754V8.08569C6.87222 8.21183 6.92049 8.3328 7.00641 8.42199C7.09232 8.51119 7.20885 8.5613 7.33035 8.56132H10.9347L10.5911 11.4151H7.33035C7.20885 11.4151 7.09232 11.4652 7.00641 11.5544C6.92049 11.6436 6.87222 11.7646 6.87221 11.8907V20.9277H4.12332V11.8907C4.12331 11.7646 4.07504 11.6436 3.98912 11.5544C3.90321 11.4652 3.78668 11.4151 3.66518 11.4151H0.916294V8.56132H3.66518C3.78668 8.5613 3.90321 8.51119 3.98912 8.42199C4.07504 8.3328 4.12331 8.21183 4.12332 8.08569V5.40656C4.12332 3.91088 4.54496 2.81901 5.25616 2.08552C5.96737 1.35203 6.99585 0.951257 8.31107 0.951257Z" fill="#ffffff"></path>
        </svg>
      ),
      'Twitter': (
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
          <path d="M0.326172 0.344238L7.49254 11.3325L0.477957 19.879H2.03209L8.17892 12.3848L13.0666 19.879H18.9385L11.4514 8.39972L18.0583 0.344238H16.509L10.764 7.34446L6.19807 0.344238H0.326172ZM2.18196 1.37238H5.68353L17.0827 18.8509H13.5811L2.18196 1.37238Z" fill="#ffffff"></path>
        </svg>
      ),
      'Instagram': (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
        </svg>
      ),
      'LinkedIn': (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4.98 3.5c0 1.38-1.12 2.5-2.49 2.5C1.12 6 0 4.88 0 3.5S1.12 1 2.49 1C3.86 1 4.98 2.12 4.98 3.5ZM.43 8h4.1v12h-4.1V8Zm7.89 0h3.93v1.64h.06c.55-1.04 1.9-2.13 3.91-2.13 4.18 0 4.95 2.75 4.95 6.33V20h-4.1v-6.38c0-1.52-.03-3.49-2.13-3.49-2.13 0-2.46 1.66-2.46 3.38V20h-4.1V8Z"
            fill="none"
            stroke="white"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    };

    return iconMap[platform] || <span>{platform}</span>;
  }

  render() {
    return (
      <footer class="app-footer">
        <div class="footer-top">
          <div class="footer-top-content">
            <brand-logo type="full-slogan"></brand-logo>
            <nav class="footer-top-links">
              {this.links.map((link) => (
                <custom-link key={link.label} label={link.label} href={link.href}></custom-link>
              ))}
            </nav>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-top">
            <div class="footer-bottom-top-content">
              <p class="footer-cta">
                <span class="footer-cta-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                    <path
                      d="M1.50677 0C0.684808 0 0.00732144 0.646928 0.00732144 1.43182V2.78347C-0.00244048 2.83567 -0.00244048 2.88787 0.00732144 2.93821V17.5789C-0.00244048 17.6311 -0.00244048 17.6833 0.00732144 17.7337V19.5682C0.00732144 20.3531 0.684808 21 1.50677 21H11.5031C12.3251 21 13.0026 20.3531 13.0026 19.5682V17.7393C13.0123 17.6871 13.0123 17.6349 13.0026 17.5845V2.9438C13.0123 2.8916 13.0123 2.8394 13.0026 2.78906V1.43182C13.0026 0.646928 12.3251 0 11.5031 0H1.50677ZM1.50677 0.954545H11.5031C11.7804 0.954545 12.0029 1.16708 12.0029 1.43182V2.38636H1.00696V1.43182C1.00696 1.16708 1.22953 0.954545 1.50677 0.954545ZM1.00696 3.34091H12.0029V17.1818H1.00696V3.34091ZM17.3193 4.46884L16.6106 5.1456C18.073 6.41335 19.0004 8.23109 19.0004 10.2614C19.0004 12.1686 18.1843 13.8968 16.8722 15.1497L17.5732 15.819C19.0687 14.3946 20 12.4333 20 10.2614C20 7.96822 18.9613 5.90998 17.3193 4.46884ZM15.199 6.49352L14.4864 7.17401C15.4099 7.91602 16.0015 9.02157 16.0015 10.2614C16.0015 11.38 15.5173 12.3867 14.748 13.1213L15.4548 13.7962C16.4056 12.8901 17.0011 11.6428 17.0011 10.2614C17.0011 8.7587 16.3002 7.41264 15.199 6.49352ZM1.00696 18.1364H12.0029V19.5682C12.0029 19.8329 11.7804 20.0455 11.5031 20.0455H1.50677C1.22953 20.0455 1.00696 19.8329 1.00696 19.5682V18.1364ZM5.00549 18.6136C4.82587 18.6118 4.65796 18.7013 4.5662 18.8504C4.47639 18.9996 4.47639 19.1823 4.5662 19.3314C4.65796 19.4806 4.82587 19.57 5.00549 19.5682H8.00439C8.18401 19.57 8.35192 19.4806 8.44368 19.3314C8.5335 19.1823 8.5335 18.9996 8.44368 18.8504C8.35192 18.7013 8.18401 18.6118 8.00439 18.6136H5.00549Z"
                      fill="white"
                    />
                  </svg>
                </span>
                Call for a quote <a href={`tel:${this.phone}`} class="footer-phone">{this.phone}</a>
              </p>
              <div class="social-links">
                {this.socialLinks.map((social) => (
                  <a key={social.platform} href={social.url} class="social-link" title={social.platform} aria-label={social.platform}>
                    {this.getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div class="footer-bottom-main">
            <div class="footer-content">
              <div class="footer-info">
                <p class="footer-disclaimer">
                  {this.companyName} Assurance<sup>®</sup> and Plymouth Rock<sup>®</sup> are brand names and service marks used by separate underwriting, managed insurance, and management companies that offer property and casualty insurance in multiple states pursuant to licensing agreements. Each underwriting and managed insurance company is a separate legal entity that is financially responsible only for its own insurance products. A full list of underwriting companies by state can be found on our <custom-link variant="footer-bottom" label="states licensed & disclaimers page" href="/states-licensed-disclaimers"></custom-link>. Actual coverage is subject to the language of the policy as issued. Some discounts, coverages, payment plans, features and benefits are not available in all states and companies, and premiums may vary by purchase method. PA Residents: <span>WE RESERVE THE RIGHT TO REFUSE TO QUOTE ANY INDIVIDUAL A PREMIUM RATE FOR THE INSURANCE ADVERTISED HEREIN</span>.
                </p>
                <p class="footer-copyright">© 2025 {this.companyName}. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
