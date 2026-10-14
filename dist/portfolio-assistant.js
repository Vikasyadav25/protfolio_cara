(() => {
  'use strict';
  const widget = document.querySelector('.portfolio-assistant');
  if (!widget) return;
  const launcher = widget.querySelector('.assistant-launcher');
  const panel = widget.querySelector('.assistant-panel');
  const form = widget.querySelector('form');
  const input = widget.querySelector('input');
  const messages = widget.querySelector('.assistant-messages');
  const normalize = text => text.toLowerCase().normalize('NFKC').replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const projects = window.portfolioProjects || {};
  let lastProject = null;
  const topics = [
    {words:['experience','career','companies','company','employers','previous','background','years','saal','anubhav'], answer:'Vanshika’s 2026 résumé states 4.5+ years of experience. Her career includes Tiger Analytics (Product Designer, July 2024–Present), Upify Digital (Senior Product Designer, January–May 2024), LeagueX (UI/UX Designer, September–December 2023), and Nickelfox (Product Designer, April 2022–August 2023).', href:'#experience', label:'View career experience'},
    {words:['skills','tools','figma','figjam','framer','protopie','sketch','storybook','storyboard','software','expertise','strengths','aata'], answer:'Her strengths include enterprise UX, Figma design systems, reusable components and tokens, interaction design, information architecture, prototyping, responsive interfaces, usability testing and engineering handoff. Her résumé lists Figma, FigJam, Adobe XD, Sketch, Framer, ProtoPie, Miro, Jira, Confluence, Zeplin, Storybook, Maze, Hotjar, Mixpanel and Google Analytics.', href:'#toolkit', label:'View skills & tools'},
    {words:['education','degree','college','university','certification','certificate','study','padhai','qualification'], answer:'Vanshika holds a Bachelor of Science from the University of Calcutta (2018–2021). Her résumé also lists UI/UX and Human–Computer Interaction certification at Ensvee (July–December 2021), plus Adobe UX Foundation, UI Components and Design Terminology credentials.', href:'#toolkit', label:'View education & certifications'},
    {words:['contact','email','reach','hire','hiring','connect','interview','baat'], answer:'You can contact Vanshika at vanshikapandey05@gmail.com. She is based in Bengaluru, India. For availability, notice period, compensation or an interview, contact her directly; these details are not published in this portfolio.', href:'mailto:vanshikapandey05@gmail.com', label:'Email Vanshika'},
    {words:['resume','cv','download','resumé','résumé'], answer:'Her 2026 résumé is available as a downloadable PDF, covering career history, responsibilities, tools and education.', href:'assets/Vanshika-Pandey-Resume.pdf', label:'Open résumé PDF'},
    {words:['location','based','city','where','kahan','bangalore','bengaluru'], answer:'Vanshika is based in Bengaluru, Karnataka, India, according to her résumé. Earlier experience includes Noida and remote work with Upify Digital in Australia.', href:'#about', label:'About Vanshika'},
    {words:['impact','results','metrics','achievement','achievements','outcomes','retention','engagement','handoff','percent'], answer:'Her résumé reports 30% faster design-to-development handoff at Tiger Analytics, 28% higher engagement at Upify Digital, and 21% higher retention plus 35% improved visual consistency at LeagueX. These are résumé-reported contributions; the measurement methods are not published here.', href:'#impact', label:'View reported impact'},
    {words:['mentorship','mentor','topmate','guidance','adplist','coaching'], answer:'Her Topmate profile offers design career guidance, résumé reviews, mock interviews and portfolio conversations. Check the original profile for current availability and services.', href:'https://topmate.io/vanshika_pandey_uiux', label:'View mentorship profile'},
    {words:['writing','articles','medium','blog','likhti'], answer:'Her writing covers competitive analysis, building a UX case study, and UI hierarchy and balance. The writing section links to three original Medium articles.', href:'#notes', label:'Explore design writing'},
    {words:['accessibility','wcag','inclusive'], answer:'Her résumé includes accessibility advocacy, WCAG 2.1, inclusive design, usability testing and component specifications. Specific accessibility audits or project-by-project compliance results are not published.', href:'#toolkit', label:'View design capabilities'},
    {words:['design system','components','tokens','libraries','variants'], answer:'At Tiger Analytics, her overall role includes Figma libraries, reusable components, design tokens, responsive patterns, usage guidelines and engineering specifications. Earlier Nickelfox and LeagueX work also includes reusable design patterns.', href:'#tiger-projects', label:'Explore design-system experience'},
    {words:['profile','name','about','introduction','introduce','summary','who','kaun','batao','overview'], answer:'Vanshika Pandey is a Bengaluru-based Product Designer with 4.5+ years of résumé-reported experience. Her work spans enterprise analytics, design systems, fintech, commerce and mobile experiences, supported by public Behance case studies and Dribbble explorations.', href:'#about', label:'Read her profile'}
  ];
  const aliases = {enterprise:['tiger','enterprise'],bali:['bali','upify'],league:['league','leaguex'],telepay:['telepay'],tofrom:['to from','to and from','gifting'],helios:['helios'],nickelfox:['nickelfox'],management:['management dashboard'],outfit:['outfit'],interview:['ai interview','interview preparation'],adoption:['adoption','pet'],travel:['travel'],swiggy:['swiggy'],pepsico:['pepsico','pepsi'],mars:['mars'],pfizer:['pfizer'],stanley:['stanley','sbd','black decker','black and decker']};
  const includes = (query, term) => (` ${query} `).includes(` ${normalize(term)} `);
  const answerFor = question => {
    const query = normalize(question);
    if (/salary|compensation|notice period|available|availability|married|age|birthday|dob/.test(query)) return {answer:'That detail is not published in the portfolio. Please contact Vanshika directly for availability, notice period or compensation questions.',href:'mailto:vanshikapandey05@gmail.com',label:'Ask Vanshika directly'};
    const match = Object.entries(aliases).find(([, words]) => words.some(word => includes(query, word)));
    const followup = lastProject && /^(and |aur |what |usme |isme |her )?(role|contribution|responsibilities|result|results|impact|when|kab|link|details)/.test(query);
    if (match || followup) {
      const key = match ? match[0] : lastProject;
      const project = projects[key];
      if (project) {
        lastProject = key;
        return {answer:`${project.summary}\n\nRole: ${project.role}. Period: ${project.period}.\n\n${project.scopeTitle || 'Contribution'}: ${project.scope.join(' ')}${project.impact ? '\n\n' + project.impact : ''}\n\n${project.note}`,href:key==='enterprise' ? '#tiger-projects' : document.getElementById('project-'+key) ? '#project-'+key : '#work',label:'View the project in this portfolio'};
      }
    }
    lastProject = null;
    if (includes(query,'dribbble') || includes(query,'dribble')) {
      const entries = Object.values(window.dribbbleStats?.shots || {});
      const views = entries.reduce((sum,item) => {const v=item.views.toLowerCase().replace(/,/g,'');return sum+parseFloat(v)*(v.endsWith('m')?1000000:v.endsWith('k')?1000:1);},0);
      const likes = entries.reduce((sum,item) => sum+item.likes,0);
      return {answer:`The Dribbble gallery contains ${entries.length} shots with approximately ${Math.round(views/1000)}K views and ${likes.toLocaleString('en-US')} likes, captured on ${window.dribbbleStats?.date}. Views are rounded by Dribbble. Public studies cover dashboards, mobile apps, websites and branding; team attribution is preserved.`,href:'#dribbble-showcase',label:'Explore Dribbble artwork'};
    }
    if (includes(query,'behance')) return {answer:'The Behance section links to 31 published projects and case studies, including Swiggy, Insurance, Travel, Management Dashboard, Outfit and Pet Adoption. Some publications have multiple owners. The recorded public snapshot shows 13,491 views, 675 appreciations and 126 followers.',href:'#behance-showcase',label:'Explore Behance case studies'};
    if (/projects|project list|portfolio work|kis kis|kaun se|clients/.test(query)) return {answer:'Professional work includes Tiger Analytics client engagements for PepsiCo, Mars, Pfizer and Stanley Black & Decker; Bali.love at Upify Digital; LeagueX; and TelePay, To & From, Helios and the Nickelfox website. Public concepts and redesigns are labeled separately in the portfolio.',href:'#work',label:'Explore selected work'};
    if (/why|suitable|fit|recommend/.test(query) && /hire|hiring|team|role|designer/.test(query)) return {answer:'Her portfolio offers examples of enterprise UX and reusable design systems alongside fintech, commerce and mobile product experience. Her résumé emphasizes cross-functional collaboration, accessibility and documented engineering handoff. Explore these examples and discuss individual contributions during an interview.',href:'#work',label:'Review her work'};
    if (/^(hi|hello|hey|namaste|hii|bhai)$/.test(query)) return {answer:'Hi! Ask me about Vanshika’s experience, client engagements, projects, skills, education, writing or contact details. I answer from this portfolio’s content.'};
    const topic = topics.map(item => ({...item,score:item.words.filter(word => includes(query,word)).length})).sort((a,b)=>b.score-a.score)[0];
    if (topic?.score) return topic;
    return {answer:'I could not find that detail in the portfolio. Try asking about a company or project by name, her design skills, education, résumé or contact details. For unpublished information, ask Vanshika directly.',href:'mailto:vanshikapandey05@gmail.com',label:'Email Vanshika'};
  };
  const appendMessage = (text, role, response) => {
    const bubble = document.createElement('div');
    bubble.className = `assistant-message assistant-${role}`;
    const author = document.createElement('span'); author.className='assistant-author'; author.textContent=role==='user'?'You':'Portfolio guide'; bubble.append(author);
    const content = document.createElement('p'); content.textContent=text; bubble.append(content);
    if (response?.href) {
      const link=document.createElement('a');link.href=response.href;link.textContent=response.label+' ↗';
      if (response.href.startsWith('https:') || response.href.endsWith('.pdf')) {link.target='_blank';link.rel='noopener noreferrer';}
      bubble.append(link);
      if (response.href.startsWith('#')) link.addEventListener('click',()=>setOpen(false));
    }
    messages.append(bubble);
    // Keep the browser-only conversation bounded during long sessions.
    while (messages.children.length>40) messages.firstElementChild.remove();
    messages.scrollTop=messages.scrollHeight;
  };
  const setOpen = open => {
    panel.hidden=!open;launcher.setAttribute('aria-expanded',String(open));
    if (open) input.focus(); else launcher.focus({preventScroll:true});
  };
  launcher.addEventListener('click',()=>setOpen(panel.hidden));
  widget.querySelector('.assistant-close').addEventListener('click',()=>setOpen(false));
  widget.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){setOpen(false);event.stopPropagation();}});
  const ask = question => {
    const clean=question.trim().slice(0,500);if(!clean)return;
    appendMessage(clean,'user');const response=answerFor(clean);appendMessage(response.answer,'bot',response);input.value='';input.focus();
  };
  form.addEventListener('submit',event=>{event.preventDefault();ask(input.value);});
  widget.querySelectorAll('[data-assistant-question]').forEach(button=>button.addEventListener('click',()=>ask(button.dataset.assistantQuestion)));
  appendMessage('Hi! I can help you explore Vanshika’s career, projects and skills. What would you like to know?','bot');
})();
