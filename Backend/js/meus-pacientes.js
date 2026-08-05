document.addEventListener('DOMContentLoaded', function() {
    
    // Exibir nome do médico
    const medicoNomeSpan = document.getElementById('medicoNome');
    if (medicoNomeSpan) {
        medicoNomeSpan.innerHTML = `Dr. Carlos Silva`;
    }
    
    // ==================== //
    // DADOS DE EXEMPLO - PACIENTES //
    // ==================== //
    
    const pacientes = [
        {
            id: 1,
            nome: 'Ana Beatriz Souza',
            idade: 34,
            telefone: '(11) 98765-4321',
            email: 'ana.souza@email.com',
            convenio: 'Unimed',
            ultimaConsulta: '21/05/2026',
            totalConsultas: 8,
            historico: [
                { data: '21/05/2026', horario: '09:00', tipo: 'Consulta', diagnostico: 'Dores de cabeça - Enxaqueca', status: 'Realizado' },
                { data: '10/04/2026', horario: '14:30', tipo: 'Retorno', diagnostico: 'Acompanhamento - Estável', status: 'Realizado' }
            ],
            laudos: [
                { id: 1, data: '21/05/2026', tipo: 'Tomografia', descricao: 'Tomografia de crânio - Sem alterações', status: 'disponivel' },
                { id: 2, data: '10/04/2026', tipo: 'Ressonância', descricao: 'Ressonância magnética - Normal', status: 'disponivel' }
            ]
        },
        {
            id: 2,
            nome: 'Carlos Eduardo Lima',
            idade: 45,
            telefone: '(11) 91234-5678',
            email: 'carlos.lima@email.com',
            convenio: 'Amil',
            ultimaConsulta: '21/05/2026',
            totalConsultas: 12,
            historico: [
                { data: '21/05/2026', horario: '10:30', tipo: 'Retorno', diagnostico: 'Hipertensão controlada', status: 'Realizado' },
                { data: '15/04/2026', horario: '08:00', tipo: 'Consulta', diagnostico: 'Pressão arterial elevada', status: 'Realizado' }
            ],
            laudos: [
                { id: 3, data: '21/05/2026', tipo: 'Eletrocardiograma', descricao: 'ECG normal - Ritmo sinusal', status: 'disponivel' },
                { id: 4, data: '15/04/2026', tipo: 'Exame de Sangue', descricao: 'Hemograma completo - Normal', status: 'disponivel' }
            ]
        },
        {
            id: 3,
            nome: 'Fernanda Oliveira',
            idade: 28,
            telefone: '(11) 99876-5432',
            email: 'fernanda.oliveira@email.com',
            convenio: 'SulAmérica',
            ultimaConsulta: '21/05/2026',
            totalConsultas: 3,
            historico: [
                { data: '21/05/2026', horario: '14:00', tipo: 'Consulta', diagnostico: 'Dor abdominal - Em investigação', status: 'Realizado' }
            ],
            laudos: [
                { id: 5, data: '21/05/2026', tipo: 'Ultrassonografia', descricao: 'Ultrassom abdominal - Aguardando laudo', status: 'pendente' }
            ]
        },
        {
            id: 4,
            nome: 'Roberto Alves',
            idade: 52,
            telefone: '(11) 97654-3210',
            email: 'roberto.alves@email.com',
            convenio: 'Bradesco Saúde',
            ultimaConsulta: '21/05/2026',
            totalConsultas: 15,
            historico: [
                { data: '21/05/2026', horario: '16:00', tipo: 'Exame', diagnostico: 'Resultado de exames - Colesterol elevado', status: 'Realizado' }
            ],
            laudos: [
                { id: 6, data: '21/05/2026', tipo: 'Lipidograma', descricao: 'Colesterol LDL elevado - 160 mg/dL', status: 'disponivel' },
                { id: 7, data: '10/04/2026', tipo: 'Ecocardiograma', descricao: 'Ecocardiograma normal - Fração de ejeção: 65%', status: 'disponivel' }
            ]
        },
        {
            id: 5,
            nome: 'Patrícia Mendes',
            idade: 39,
            telefone: '(11) 96543-2109',
            email: 'patricia.mendes@email.com',
            convenio: 'Unimed',
            ultimaConsulta: '20/05/2026',
            totalConsultas: 9,
            historico: [
                { data: '20/05/2026', horario: '15:30', tipo: 'Retorno', diagnostico: 'Controle de diabetes - Glicemia controlada', status: 'Realizado' }
            ],
            laudos: [
                { id: 8, data: '20/05/2026', tipo: 'Hemoglobina Glicada', descricao: 'HbA1c - 6.5% - Controle adequado', status: 'disponivel' }
            ]
        },
        {
            id: 6,
            nome: 'Luciana Ferreira',
            idade: 31,
            telefone: '(11) 95432-1098',
            email: 'luciana.ferreira@email.com',
            convenio: 'Amil',
            ultimaConsulta: '22/05/2026',
            totalConsultas: 5,
            historico: [
                { data: '22/05/2026', horario: '09:00', tipo: 'Consulta', diagnostico: 'Alergias respiratórias - Em tratamento', status: 'Realizado' }
            ],
            laudos: [
                { id: 9, data: '22/05/2026', tipo: 'Teste Alérgico', descricao: 'Alergia a ácaros e pólen', status: 'disponivel' }
            ]
        },
        {
            id: 7,
            nome: 'Marcos Vinicius Santos',
            idade: 47,
            telefone: '(11) 94321-0987',
            email: 'marcos.santos@email.com',
            convenio: 'SulAmérica',
            ultimaConsulta: '22/05/2026',
            totalConsultas: 7,
            historico: [
                { data: '22/05/2026', horario: '11:00', tipo: 'Retorno', diagnostico: 'Colesterol - Em acompanhamento', status: 'Realizado' }
            ],
            laudos: [
                { id: 10, data: '22/05/2026', tipo: 'Perfil Lipídico', descricao: 'Colesterol total: 220 mg/dL - LDL: 140 mg/dL', status: 'disponivel' }
            ]
        },
        {
            id: 8,
            nome: 'Juliana Costa',
            idade: 26,
            telefone: '(11) 93210-9876',
            email: 'juliana.costa@email.com',
            convenio: 'Bradesco Saúde',
            ultimaConsulta: '22/05/2026',
            totalConsultas: 2,
            historico: [
                { data: '22/05/2026', horario: '16:30', tipo: 'Consulta', diagnostico: 'Sintomas de gripe - Prescrição de medicação', status: 'Realizado' }
            ],
            laudos: [
                { id: 11, data: '22/05/2026', tipo: 'Teste COVID', descricao: 'Resultado Negativo para COVID-19', status: 'disponivel' }
            ]
        },
        {
            id: 9,
            nome: 'Ricardo Martins',
            idade: 58,
            telefone: '(11) 92109-8765',
            email: 'ricardo.martins@email.com',
            convenio: 'Unimed',
            ultimaConsulta: '23/05/2026',
            totalConsultas: 20,
            historico: [
                { data: '23/05/2026', horario: '08:00', tipo: 'Check-up', diagnostico: 'Check-up anual - Saudável', status: 'Agendado' }
            ],
            laudos: [
                { id: 12, data: '23/05/2026', tipo: 'Check-up', descricao: 'Exames dentro da normalidade', status: 'pendente' }
            ]
        },
        {
            id: 10,
            nome: 'Aline Rodrigues',
            idade: 33,
            telefone: '(11) 91098-7654',
            email: 'aline.rodrigues@email.com',
            convenio: 'Amil',
            ultimaConsulta: '23/05/2026',
            totalConsultas: 4,
            historico: [
                { data: '23/05/2026', horario: '14:00', tipo: 'Consulta', diagnostico: 'Dor nas costas - Lombalgia', status: 'Confirmado' }
            ],
            laudos: [
                { id: 13, data: '23/05/2026', tipo: 'Ressonância Lombar', descricao: 'Pequena protrusão discal em L4-L5', status: 'disponivel' }
            ]
        }
    ];
    
    // ==================== //
    // FUNÇÕES DE RENDERIZAÇÃO //
    // ==================== //
    
    function renderizarPacientes() {
        const container = document.getElementById('pacientesGrid');
        if (!container) return;
        
        const busca = document.getElementById('buscaPaciente').value.toLowerCase();
        const ordenarPor = document.getElementById('ordenarPor').value;
        
        let pacientesExibir = [...pacientes];
        
        if (busca) {
            pacientesExibir = pacientesExibir.filter(p => p.nome.toLowerCase().includes(busca));
        }
        
        if (ordenarPor === 'nome') {
            pacientesExibir.sort((a, b) => a.nome.localeCompare(b.nome));
        } else if (ordenarPor === 'data') {
            pacientesExibir.sort((a, b) => b.ultimaConsulta.localeCompare(a.ultimaConsulta));
        } else if (ordenarPor === 'consultas') {
            pacientesExibir.sort((a, b) => b.totalConsultas - a.totalConsultas);
        }
        
        if (pacientesExibir.length === 0) {
            container.innerHTML = '<div style="text-align: center; padding: 40px;">Nenhum paciente encontrado</div>';
            return;
        }
        
        container.innerHTML = '';
        pacientesExibir.forEach(paciente => {
            const iniciais = paciente.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            
            const card = document.createElement('div');
            card.className = 'paciente-card';
            card.innerHTML = `
                <div class="paciente-header">
                    <div class="paciente-avatar">${iniciais}</div>
                    <div class="paciente-info">
                        <h3>${paciente.nome}</h3>
                        <p>${paciente.idade} anos | ${paciente.convenio}</p>
                    </div>
                </div>
                <div class="paciente-body">
                    <div class="paciente-detalhe">
                        <span class="detalhe-label">Última consulta:</span>
                        <span class="detalhe-valor">${paciente.ultimaConsulta}</span>
                    </div>
                    <div class="paciente-detalhe">
                        <span class="detalhe-label">Total de consultas:</span>
                        <span class="detalhe-valor">${paciente.totalConsultas}</span>
                    </div>
                    <div class="paciente-detalhe">
                        <span class="detalhe-label">Telefone:</span>
                        <span class="detalhe-valor">${paciente.telefone}</span>
                    </div>
                    <div class="paciente-acoes">
                        <button class="btn-ver-detalhes" data-id="${paciente.id}">Ver Histórico</button>
                        <button class="btn-ver-laudos" data-id="${paciente.id}">Ver Laudos</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
        
        adicionarEventosPacientes();
    }
    
    function adicionarEventosPacientes() {
        document.querySelectorAll('.btn-ver-detalhes').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const paciente = pacientes.find(p => p.id === id);
                if (paciente) abrirModalHistorico(paciente);
            });
        });
        
        document.querySelectorAll('.btn-ver-laudos').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                const paciente = pacientes.find(p => p.id === id);
                if (paciente) abrirModalLaudos(paciente);
            });
        });
    }
    
    // ==================== //
    // MODAL DE HISTÓRICO   //
    // ==================== //
    
    function abrirModalHistorico(paciente) {
        const modal = document.getElementById('modalPaciente');
        const modalTitulo = document.getElementById('modalTitulo');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;
        
        modalTitulo.innerHTML = `Histórico - ${paciente.nome}`;
        modal.style.display = 'flex';
        
        let html = `
            <div class="modal-section">
                <h4>Informações</h4>
                <div class="paciente-detalhe">
                    <span class="detalhe-label">Nome:</span>
                    <span class="detalhe-valor">${paciente.nome}</span>
                </div>
                <div class="paciente-detalhe">
                    <span class="detalhe-label">Idade:</span>
                    <span class="detalhe-valor">${paciente.idade} anos</span>
                </div>
                <div class="paciente-detalhe">
                    <span class="detalhe-label">Telefone:</span>
                    <span class="detalhe-valor">${paciente.telefone}</span>
                </div>
                <div class="paciente-detalhe">
                    <span class="detalhe-label">Convênio:</span>
                    <span class="detalhe-valor">${paciente.convenio}</span>
                </div>
            </div>
            <div class="modal-section">
                <h4>Histórico de Consultas</h4>
                <table class="historico-table">
                    <thead>
                        <tr><th>Data</th><th>Horário</th><th>Tipo</th><th>Diagnóstico</th><th>Status</th></tr>
                    </thead>
                    <tbody>
        `;
        
        paciente.historico.forEach(item => {
            html += `<tr><td>${item.data}</td><td>${item.horario}</td><td>${item.tipo}</td><td>${item.diagnostico}</td><td>${item.status}</td></tr>`;
        });
        
        html += `</tbody></table></div>`;
        modalBody.innerHTML = html;
    }
    
    // ==================== //
    // MODAL DE LAUDOS      //
    // ==================== //
    
    function abrirModalLaudos(paciente) {
        const modal = document.getElementById('modalPaciente');
        const modalTitulo = document.getElementById('modalTitulo');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;
        
        modalTitulo.innerHTML = `Laudos - ${paciente.nome}`;
        modal.style.display = 'flex';
        
        let html = `
            <div class="modal-section">
                <h4>Laudos e Exames</h4>
                <table class="laudos-table">
                    <thead>
                        <tr><th>Data</th><th>Tipo</th><th>Descrição</th><th>Status</th></tr>
                    </thead>
                    <tbody>
        `;
        
        paciente.laudos.forEach(laudo => {
            const statusText = laudo.status === 'disponivel' ? 'Disponível' : 'Pendente';
            const statusClass = laudo.status === 'disponivel' ? 'status-disponivel' : 'status-pendente';
            html += `<tr><td>${laudo.data}</td><td>${laudo.tipo}</td><td>${laudo.descricao}</td><td><span class="status-laudo ${statusClass}">${statusText}</span></td></tr>`;
        });
        
        html += `</tbody></table></div>`;
        modalBody.innerHTML = html;
    }
    
    // ==================== //
    // FILTROS              //
    // ==================== //
    
    function aplicarFiltros() {
        renderizarPacientes();
    }
    
    function limparFiltros() {
        document.getElementById('buscaPaciente').value = '';
        document.getElementById('ordenarPor').value = 'nome';
        renderizarPacientes();
    }
    
    function fecharModal() {
        const modal = document.getElementById('modalPaciente');
        if (modal) modal.style.display = 'none';
    }
    
    // ==================== //
    // INICIALIZAÇÃO        //
    // ==================== //
    
    document.getElementById('btnFiltrar')?.addEventListener('click', aplicarFiltros);
    document.getElementById('btnLimpar')?.addEventListener('click', limparFiltros);
    document.querySelector('.modal-close')?.addEventListener('click', fecharModal);
    document.querySelector('.btn-fechar-modal')?.addEventListener('click', fecharModal);
    
    renderizarPacientes();
});