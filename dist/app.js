(() => {
  'use strict';
  const projects = {
    enterprise: {title:'A shared language for complex enterprise experiences',type:'Professional experience · Tiger Analytics',role:'Product Designer',period:'July 2024 — Present',context:'Enterprise UX & design systems',summary:'At Tiger Analytics, my experience spans analytics dashboards, data acquisition workflows and visualization platforms for client engagements including PepsiCo, Mars, Pfizer and Stanley Black & Decker.',scope:['Interaction design, wireframes, prototypes and responsive patterns for complex workflows.','Figma libraries, reusable components, design tokens and design-system guidance.','Component specifications, usage guidelines, design rationale and implementation documentation.','Collaboration with product, engineering, analytics teams and client stakeholders; usability testing and accessibility advocacy.'],note:'This is an experience overview. The graphic on the portfolio is an editorial illustration of design-system work, not a client interface. Specific client screens and detailed project stories are not published here.',link:'mailto:vanshikapandey05@gmail.com?subject=Enterprise%20design%20portfolio%20conversation',cta:'Discuss this experience'},
    telepay: {title:'Designing everyday fintech experiences',type:'Professional work · Nickelfox Technologies',image:'assets/proj2.webp',role:'Product Designer',period:'During April 2022 — August 2023',context:'Fintech · mobile',summary:'TelePay was one of the fintech products I worked on at Nickelfox. My earlier portfolio describes mobile interface work across online transactions, payments, insurance management and children’s savings accounts.',scope:['Mobile fintech screen design and clear interface structure.','User-centered interaction design within a broader product team.','Reusable components, design consistency and collaboration with engineering.'],note:'The image is an original preview from my earlier portfolio. This overview describes design scope; it does not claim ownership of backend functionality or a verified product outcome.',link:'https://www.figma.com/proto/3P5iocyHiwLz10JfaEmQ1a/Vanshika-s-Design-Portfolio?node-id=1-14623&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A14359',cta:'Open Figma portfolio'},
    management: {title:'Making teamwork easier to navigate',type:'Public exploration · Management Dashboard',image:'assets/img11.webp',role:'Portfolio design exploration',period:'Public portfolio',context:'Task management · dashboard',summary:'A dashboard concept exploring how teams can organize tasks and keep company goals in view. The public work presents a task-management interface and a corresponding case-study entry.',scope:['Task-management dashboard presentation.','Information grouping and interface hierarchy.','Visual design exploration for a team-oriented product.'],note:'This is public concept work, not a claimed client release. The linked case-study material provides the original portfolio context.',link:'https://www.behance.net/gallery/188736629/Management-Dashboard-case-Study',cta:'View on Behance'},
    outfit: {title:'Fashion discovery, with a personal touch',type:'Public portfolio · Outfit Mobile App',image:'assets/img13.webp',role:'Portfolio project',period:'Public portfolio',context:'Fashion · mobile commerce',summary:'A mobile fashion interface presented in my public portfolio, bringing product discovery and visual presentation together in a dedicated case-study entry.',scope:['Fashion-focused mobile interface presentation.','Product discovery and commerce-oriented visual design.','An original portfolio cover showing the app’s screens.'],note:'This entry is presented as portfolio work. It is not attributed to a specific employer or release date, and is not assumed to be the same work as my earlier Outfit internship.',link:'https://www.behance.net/gallery/186968059/OUTFIT-MOBILE-APP',cta:'View on Behance'},
    interview: {title:'A fresh perspective on interview preparation',type:'Public exploration · iOS mobile UI',image:'assets/interview.webp',role:'Design publication for Nickelfox',period:'Public portfolio',context:'Interview preparation · mobile UI',summary:'An AI-themed interview-preparation interface exploration, published on Dribbble under Vanshika Pandey for Nickelfox. The original artwork explores the visual direction of a mobile preparation experience.',scope:['iOS-oriented interface exploration.','Visual hierarchy, layout and screen presentation.','A public design publication with Nickelfox team attribution.'],note:'This is a design exploration. AI engineering, product launch and measured user outcomes are not claimed. Team publication does not imply sole product ownership.',link:'https://dribbble.com/shots/21220521-AI-job-interview-preparation-IOS-Mobile-App',cta:'View on Dribbble'},
    adoption: {title:'Helping people find their next companion',type:'Public case study · Pet Adoption',image:'assets/img16.webp',role:'Portfolio case study',period:'Public portfolio',context:'Pet adoption · mobile UX',summary:'A public pet-adoption design concept focused on connecting people with a companion that fits their lifestyle. The original case-study cover introduces the adoption experience and mobile interface.',scope:['Adoption-focused mobile experience presentation.','A lifestyle-oriented discovery concept.','Original portfolio artwork and a published case-study entry.'],note:'This is portfolio concept work. No live service, research sample size or adoption conversion result is claimed in this overview.',link:'https://www.behance.net/gallery/184131651/Pet-Adoption-App-Case-Study',cta:'View on Behance'}
  };
  Object.assign(projects, window.portfolioWork?.additionalProjects || {});
  projects.enterprise.impact = '30% faster design-to-development handoff, reported in my résumé.';
  const dialog = document.querySelector('.project-dialog');
  const detail = document.querySelector('#project-detail');
  let opener = null;
  const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const stats = window.dribbbleStats;
  const shotStats = slug => stats?.shots[String(slug).split('-')[0]];
  const statsMarkup = metric => metric ? `<span class="shot-stats"><span>${escapeHTML(metric.views)} views</span><span>♡ ${metric.likes.toLocaleString('en-US')} likes</span></span>` : '';
  document.querySelectorAll('.shot-frame a').forEach(link => {
    link.insertAdjacentHTML('beforeend', statsMarkup(shotStats(link.pathname.split('/').pop())));
  });
  if (stats) {
    const metrics = window.portfolioWork.archives.dribbble.map(entry => shotStats(entry[2])).filter(Boolean);
    const views = metrics.reduce((total, metric) => {
      const value = metric.views.replace(/,/g, '').toLowerCase();
      return total + parseFloat(value) * (value.endsWith('m') ? 1000000 : value.endsWith('k') ? 1000 : 1);
    }, 0);
    const likes = metrics.reduce((total, metric) => total + metric.likes, 0);
    document.querySelector('#dribbble-summary').innerHTML = `<div><strong>≈${Math.round(views / 1000)}K</strong><span>Views across ${metrics.length} shots</span></div><div><strong>${likes.toLocaleString('en-US')}</strong><span>Likes across ${metrics.length} shots</span></div>`;
    const date = new Date(`${stats.date}T12:00:00Z`).toLocaleDateString('en-GB', {day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
    document.querySelector('#dribbble-stats-date').textContent = `Dribbble snapshot · ${date} · Views are rounded by Dribbble.`;
  }
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    if (!project || !dialog) return;
    opener = button;
    detail.innerHTML = `${project.image ? `<img class="detail-cover" src="${project.image}" alt="${escapeHTML(project.title)}">` : ''}<div class="detail-content"><span class="eyebrow">${escapeHTML(project.type)}</span><h2 id="dialog-title">${escapeHTML(project.title)}</h2><p class="detail-lead">${escapeHTML(project.summary)}</p><dl class="detail-facts"><div><dt>ROLE / CONTRIBUTION</dt><dd>${escapeHTML(project.role)}</dd></div><div><dt>PERIOD</dt><dd>${escapeHTML(project.period)}</dd></div><div><dt>CONTEXT</dt><dd>${escapeHTML(project.context)}</dd></div></dl><h3>My contribution</h3><ul>${project.scope.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>${project.impact ? `<div class="detail-impact"><span class="eyebrow">REPORTED IMPACT</span><p>${escapeHTML(project.impact)}</p></div>` : ''}<p class="detail-note">${escapeHTML(project.note)}</p><a class="button button-dark" href="${project.link}" ${project.link.startsWith('https:') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${escapeHTML(project.cta)} <span aria-hidden="true">↗</span></a></div>`;
    dialog.showModal();
    document.body.classList.add('body-dialog-open');
    dialog.scrollTop = 0;
  }));
  document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog?.addEventListener('close', () => {
    document.body.classList.remove('body-dialog-open');
    opener?.focus({preventScroll:true});
  });
  const applyWorkFilter = filterKey => {
    document.querySelectorAll('.filter').forEach(filter => {
      const active = filter.dataset.filter === filterKey;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.project').forEach(card => {card.hidden = filterKey !== 'all' && !card.dataset.category.split(' ').includes(filterKey);});
    document.querySelectorAll('.work-group').forEach(group => {group.hidden = !group.querySelector('.project:not([hidden])');});
    const count = document.querySelectorAll('.project:not([hidden])').length;
    const labels = {professional:'professional work entries',exploration:'public concepts and redesigns',all:'entries across professional work and public concepts',enterprise:'enterprise and design-system entries',mobile:'mobile-experience entries'};
    const status = document.querySelector('#work-status');
    if (status) status.textContent = `${count} ${labels[filterKey] || 'entries'}. Select a card to read the project overview.`;
  };
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => applyWorkFilter(button.dataset.filter)));
  applyWorkFilter('professional');
  document.querySelectorAll('a[href="#work"],a[href^="#project-"]').forEach(link => link.addEventListener('click', () => applyWorkFilter('professional')));
  document.querySelector('.copy-email')?.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('vanshikapandey05@gmail.com');
      status.textContent = 'Email copied';
    } catch {
      status.textContent = 'Use the email link to get in touch';
    }
  });
  const shotTrack = document.querySelector('#shot-track');
  document.querySelectorAll('[data-shot-direction]').forEach(button => button.addEventListener('click', () => {
    if (!shotTrack) return;
    const frame = shotTrack.querySelector('.shot-frame');
    const step = (frame?.getBoundingClientRect().width || 320) * Number(button.dataset.shotDirection);
    shotTrack.scrollBy({left:step,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  }));
  const archiveList = document.querySelector('#archive-list');
  if (archiveList && window.portfolioWork) {
    let platform = 'behance';
    let expanded = false;
    const search = document.querySelector('#archive-search');
    const category = document.querySelector('#archive-category');
    const status = document.querySelector('#archive-status');
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'archive-toggle';
    toggle.setAttribute('aria-controls','archive-list');
    archiveList.after(toggle);
    const renderArchive = () => {
      const query = search.value.trim().toLowerCase();
      const source = window.portfolioWork.archives[platform];
      const entries = source.filter(entry => (!query || entry[0].toLowerCase().includes(query)) && (category.value === 'all' || category.value === entry[1]));
      const visibleEntries = expanded || query || category.value !== 'all' ? entries : entries.slice(0,8);
      archiveList.innerHTML = visibleEntries.map(entry => {
        const [title, type, slug, shared] = entry;
        const link = platform === 'behance' ? (slug ? `https://www.behance.net/gallery/${slug}` : 'https://www.behance.net/vanshikapandey1') : `https://dribbble.com/shots/${slug}`;
        const ownership = shared ? (platform === 'behance' ? 'Multiple owners' : 'For Nickelfox') : 'Vanshika Pandey';
        return `<li><a href="${link}" target="_blank" rel="noopener noreferrer"><span class="archive-title">${escapeHTML(title)}${platform === 'dribbble' ? statsMarkup(shotStats(slug)) : ''}</span><span class="archive-category">${escapeHTML(type)}</span><span class="archive-ownership">${ownership}</span><span class="archive-action">${slug ? 'View work' : 'View profile'} ↗</span></a></li>`;
      }).join('');
      status.textContent = `${visibleEntries.length} of ${source.length} ${platform === 'behance' ? 'Behance publications' : 'Dribbble shots'}${query ? ` matching “${search.value.trim()}”` : ''}`;
      if (!entries.length) archiveList.innerHTML = '<li class="archive-empty">No matching work. Try another keyword or category.</li>';
      toggle.hidden = entries.length <= 8 || Boolean(query) || category.value !== 'all';
      toggle.textContent = expanded ? 'Show fewer publications ↑' : `Explore all ${entries.length} publications ↓`;
      toggle.setAttribute('aria-expanded',String(expanded));
    };
    document.querySelectorAll('[data-platform]').forEach(button => button.addEventListener('click', () => {
      platform = button.dataset.platform;
      expanded = false;
      document.querySelectorAll('[data-platform]').forEach(tab => {
        tab.classList.toggle('active',tab === button);
        tab.setAttribute('aria-pressed',String(tab === button));
      });
      renderArchive();
    }));
    search.addEventListener('input',renderArchive);
    category.addEventListener('change',renderArchive);
    toggle.addEventListener('click',() => {
      expanded = !expanded;
      renderArchive();
      if (!expanded) document.querySelector('#archive').scrollIntoView({block:'start'});
    });
    renderArchive();
  }
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.remove('pending');observer.unobserve(entry.target);}
    }), {threshold:0.08});
    document.querySelectorAll('.section-heading,.about-grid,.principles,.timeline article,.note,.impact-card,.toolkit-card').forEach(element => {
      element.classList.add('reveal','pending');observer.observe(element);
    });
  }
})();
