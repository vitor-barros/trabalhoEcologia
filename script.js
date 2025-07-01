const quizData = {
            questions: [
                {
                    id: 1,
                    title: "Que tipo de material você deseja reciclar?",
                    options: [
                        {
                            id: "plastic",
                            icon: "🥤",
                            title: "Plásticos",
                            description: "Garrafas PET, embalagens, sacolas plásticas"
                        },
                        {
                            id: "paper",
                            icon: "📄",
                            title: "Papel e Papelão",
                            description: "Jornais, revistas, caixas de papelão"
                        },
                        {
                            id: "glass",
                            icon: "🍺",
                            title: "Vidro",
                            description: "Garrafas, potes, frascos de vidro"
                        },
                        {
                            id: "metal",
                            icon: "🥫",
                            title: "Metal",
                            description: "Latas de alumínio, ferro, cobre"
                        },
                        {
                            id: "electronic",
                            icon: "📱",
                            title: "Eletrônicos",
                            description: "Celulares, computadores, eletrodomésticos"
                        },
                        {
                            id: "organic",
                            icon: "🍎",
                            title: "Orgânicos",
                            description: "Restos de comida, cascas de frutas"
                        }
                    ]
                },
                {
                    id: 2,
                    title: "Qual a quantidade aproximada do material?",
                    options: [
                        {
                            id: "small",
                            icon: "🤏",
                            title: "Pequena",
                            description: "Até 5kg ou alguns itens"
                        },
                        {
                            id: "medium",
                            icon: "📦",
                            title: "Média",
                            description: "5-20kg ou várias sacolas"
                        },
                        {
                            id: "large",
                            icon: "🚛",
                            title: "Grande",
                            description: "Mais de 20kg ou mudança/limpeza"
                        }
                    ]
                },
                {
                    id: 3,
                    title: "Você tem transporte próprio?",
                    options: [
                        {
                            id: "car",
                            icon: "🚗",
                            title: "Carro",
                            description: "Posso levar os materiais de carro"
                        },
                        {
                            id: "bike",
                            icon: "🚲",
                            title: "Bicicleta/A pé",
                            description: "Só posso levar pequenas quantidades"
                        },
                        {
                            id: "none",
                            icon: "🚶",
                            title: "Sem transporte",
                            description: "Preciso de coleta ou local muito próximo"
                        }
                    ]
                },
                {
                    id: 4,
                    title: "Em que região de Niterói você está?",
                    options: [
                        {
                            id: "icarai",
                            icon: "🏖️",
                            title: "Icaraí/Centro",
                            description: "Região central e praias"
                        },
                        {
                            id: "itaipu",
                            icon: "🌊",
                            title: "Itaipu/Camboinhas",
                            description: "Região oceânica"
                        },
                        {
                            id: "pendotiba",
                            icon: "🏘️",
                            title: "Pendotiba/Fonseca",
                            description: "Região leste"
                        },
                        {
                            id: "sao_francisco",
                            icon: "⛰️",
                            title: "São Francisco/Charitas",
                            description: "Região oeste"
                        }
                    ]
                }
            ]
        };

        const recyclingLocations = {
            plastic: {
                small: {
                    icarai: [
                        {
                            name: "Pão de Açúcar Icaraí",
                            address: "Rua Moreira César, 229 - Icaraí",
                            hours: "Seg-Dom: 7h-23h",
                            type: "Ponto de coleta PET"
                        },
                        {
                            name: "Extra Niterói Plaza",
                            address: "Rua XV de Novembro, 8 - Centro",
                            hours: "Seg-Sáb: 8h-22h",
                            type: "Ecoponto supermercado"
                        }
                    ],
                    itaipu: [
                        {
                            name: "Cooperativa Mutirão",
                            address: "Estrada Francisco da Cruz Nunes, 6501 - Itaipu",
                            hours: "Seg-Sex: 8h-17h",
                            type: "Cooperativa de reciclagem"
                        }
                    ]
                },
                medium: {
                    icarai: [
                        {
                            name: "Ecoponto Niterói Shopping",
                            address: "Rua Visconde do Rio Branco, 701 - São Domingos",
                            hours: "Seg-Sáb: 10h-22h",
                            type: "Ecoponto shopping"
                        }
                    ]
                }
            },
            electronic: {
                small: {
                    icarai: [
                        {
                            name: "GreenTech Reciclagem",
                            address: "Rua Presidente Backer, 113 - Icaraí",
                            hours: "Seg-Sex: 9h-18h",
                            type: "Especializada em eletrônicos"
                        },
                        {
                            name: "Casas Bahia Centro",
                            address: "Rua da Conceição, 77 - Centro",
                            hours: "Seg-Sáb: 9h-19h",
                            type: "Troca-troca eletrônicos"
                        }
                    ]
                }
            }
        };

        let currentQuestion = 0;
        let answers = {};

        function renderQuestion() {
            const question = quizData.questions[currentQuestion];
            const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
            
            document.getElementById('progressFill').style.width = `${progress}%`;
            
            const container = document.getElementById('questionContainer');
            container.innerHTML = `
                <div class="question-header">
                    <div class="question-number">${currentQuestion + 1}</div>
                    <div class="question-title">${question.title}</div>
                </div>
                
                <div class="options-grid">
                    ${question.options.map(option => `
                        <div class="option-card" data-value="${option.id}">
                            <div class="option-icon">${option.icon}</div>
                            <div class="option-title">${option.title}</div>
                            <div class="option-description">${option.description}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="navigation">
                    <button class="btn" id="prevBtn" ${currentQuestion === 0 ? 'style="visibility: hidden;"' : ''}>
                        ← Anterior
                    </button>
                    <button class="btn" id="nextBtn" disabled>
                        ${currentQuestion === quizData.questions.length - 1 ? 'Ver Resultado' : 'Próxima →'}
                    </button>
                </div>
            `;

            // Adicionar event listeners
            document.querySelectorAll('.option-card').forEach(card => {
                card.addEventListener('click', () => selectOption(card, question.id));
            });

            document.getElementById('prevBtn').addEventListener('click', previousQuestion);
            document.getElementById('nextBtn').addEventListener('click', nextQuestion);

            // Restaurar seleção anterior se existir
            if (answers[question.id]) {
                const selectedCard = document.querySelector(`[data-value="${answers[question.id]}"]`);
                if (selectedCard) {
                    selectedCard.classList.add('selected');
                    document.getElementById('nextBtn').disabled = false;
                }
            }
        }

        function selectOption(card, questionId) {
            // Remove seleção anterior
            document.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
            
            // Adiciona nova seleção
            card.classList.add('selected');
            
            // Salva resposta
            answers[questionId] = card.dataset.value;
            
            // Habilita botão próximo
            document.getElementById('nextBtn').disabled = false;
        }

        function previousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                renderQuestion();
            }
        }

        function nextQuestion() {
            if (currentQuestion < quizData.questions.length - 1) {
                currentQuestion++;
                renderQuestion();
            } else {
                showResult();
            }
        }

        function generateRecommendation() {
            const material = answers[1];
            const quantity = answers[2];
            const transport = answers[3];
            const region = answers[4];

            // aqui é a estrutua de recomendações, ta inicializando o objeto.
            let recommendations = {
                tips: [],
                locations: [],
                customAdvice: ""
            };

            // Dicas baseadas no tipo de material
            switch(material) {
                case 'plastic':
                    recommendations.tips = [
                        "Remova tampas e rótulos quando possível",
                        "Lave as embalagens para remover restos de comida",
                        "Separe por tipo: PET (garrafas), PEAD (potes), etc."
                    ];
                    break;
                case 'paper':
                    recommendations.tips = [
                        "Remova fitas adesivas e grampos",
                        "Não misture papel com restos orgânicos",
                        "Desmonte as caixas de papelão para economizar espaço"
                    ];
                    break;
                case 'electronic':
                    recommendations.tips = [
                        "Remova dados pessoais dos dispositivos",
                        "Mantenha cabos e acessórios juntos",
                        "Procure pontos especializados em e-lixo"
                    ];
                    break;
                case 'glass':
                    recommendations.tips = [
                        "Separe por cor (transparente, verde, âmbar)",
                        "Remova tampas metálicas ou plásticas",
                        "Embale com cuidado para evitar quebras"
                    ];
                    break;
            }

            // Locais baseados na combinação de fatores
            const locationKey = `${material}_${quantity}_${region}`;
            
            // Simulação de locais específicos para Niterói
            const niteroi_locations = {
                plastic_small_icarai: [
                    {
                        name: "Supermercado Guanabara Icaraí",
                        address: "Rua Moreira César, 221 - Icaraí",
                        hours: "Seg-Dom: 7h-22h",
                        type: "Ponto de coleta PET"
                    },
                    {
                        name: "Ecoponto Plaza Shopping",
                        address: "Rua XV de Novembro, 8 - Centro",
                        hours: "Seg-Sáb: 10h-22h",
                        type: "Ecoponto completo"
                    }
                ],
                electronic_small_icarai: [
                    {
                        name: "GreenTech Reciclagem",
                        address: "Rua Presidente Backer, 113 - Icaraí",
                        hours: "Seg-Sex: 9h-18h, Sáb: 9h-14h",
                        type: "Especializada em eletrônicos"
                    },
                    {
                        name: "Magazine Luiza Icaraí",
                        address: "Rua da Conceição, 77 - Centro",
                        hours: "Seg-Sáb: 9h-19h",
                        type: "Programa de logística reversa"
                    }
                ]
            };

            recommendations.locations = niteroi_locations[locationKey] || [
                {
                    name: "Ecoponto Central Niterói",
                    address: "Rua Visconde do Rio Branco, 701 - São Domingos",
                    hours: "Seg-Sex: 8h-17h",
                    type: "Ponto de coleta municipal"
                },
                {
                    name: "COMLURB - Coleta Seletiva",
                    address: "Consulte o cronograma no site da prefeitura",
                    hours: "Conforme calendário local",
                    type: "Coleta domiciliar"
                }
            ];

            // Conselhos personalizados baseados no transporte
            if (transport === 'none') {
                recommendations.customAdvice = "Como você não tem transporte, recomendamos aguardar a coleta seletiva da COMLURB ou procurar pontos muito próximos à sua residência. Considere também combinar com vizinhos para dividir o transporte.";
            } else if (transport === 'bike') {
                recommendations.customAdvice = "Para transporte de bicicleta, embale bem os materiais em sacolas resistentes. Evite materiais cortantes soltos e prefira fazer várias viagens pequenas ao invés de sobrecarregar.";
            } else {
                recommendations.customAdvice = "Com carro disponível, você pode levar maiores quantidades diretamente aos pontos de coleta. Aproveite para combinar com outros materiais que precise descartar.";
            }

            // Ajuste para quantidade grande
            if (quantity === 'large') {
                recommendations.customAdvice += " Para grandes quantidades, considere entrar em contato com cooperativas de reciclagem que podem fazer coleta no local.";
            }

            return recommendations;
        }

        function showResult() {
            const recommendations = generateRecommendation();
            const materialTypes = {
                plastic: { icon: "🥤", name: "Plásticos" },
                paper: { icon: "📄", name: "Papel e Papelão" },
                glass: { icon: "🍺", name: "Vidro" },
                metal: { icon: "🥫", name: "Metal" },
                electronic: { icon: "📱", name: "Eletrônicos" },
                organic: { icon: "🍎", name: "Orgânicos" }
            };

            const selectedMaterial = materialTypes[answers[1]];
            
            document.getElementById('progressFill').style.width = '100%';
            
            const container = document.getElementById('questionContainer');
            container.innerHTML = `
                <div class="result-container">
                    <div class="result-icon">${selectedMaterial.icon}</div>
                    <div class="result-title">Recomendações para ${selectedMaterial.name}</div>
                    
                    <div class="result-content">
                        <h3 style="color: #667eea; margin-bottom: 15px;">🎯 Dica Personalizada</h3>
                        <p style="background: #f0f4ff; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                            ${recommendations.customAdvice}
                        </p>
                        
                        <h3 style="color: #667eea; margin: 25px 0 15px 0;">📋 Como Preparar</h3>
                        <ul style="list-style: none; padding: 0;">
                            ${recommendations.tips.map(tip => `
                                <li style="padding: 8px 0; border-bottom: 1px solid #eee;">
                                    ✅ ${tip}
                                </li>
                            `).join('')}
                        </ul>
                        
                        <h3 style="color: #667eea; margin: 25px 0 15px 0;">📍 Onde Reciclar em Niterói</h3>
                        ${recommendations.locations.map(location => `
                            <div class="location-card">
                                <div class="location-name">${location.name}</div>
                                <div class="location-address">📍 ${location.address}</div>
                                <div class="location-hours">🕐 ${location.hours}</div>
                                <div style="color: #667eea; font-size: 0.85rem; margin-top: 5px;">
                                    ${location.type}
                                </div>
                            </div>
                        `).join('')}
                        
                        <div style="background: #e8f5e8; padding: 20px; border-radius: 12px; margin-top: 25px; border-left: 4px solid #4caf50;">
                            <h4 style="color: #2e7d2e; margin-bottom: 10px;">🌱 Impacto Ambiental</h4>
                            <p style="color: #2e7d2e; margin: 0;">
                                Ao reciclar ${selectedMaterial.name.toLowerCase()}, você está contribuindo para a redução do lixo nos aterros sanitários, 
                                economia de recursos naturais e diminuição da poluição. Cada gesto faz a diferença para um Niterói mais sustentável!
                            </p>
                        </div>
                    </div>
                    
                    <div class="navigation">
                        <button class="btn" onclick="restartQuiz()">🔄 Fazer Novo Quiz</button>
                        <button class="btn" onclick="shareResult()">📤 Compartilhar</button>
                    </div>
                </div>
            `;
        }

        function restartQuiz() {
            currentQuestion = 0;
            answers = {};
            renderQuestion();
        }

        function shareResult() {
            const selectedMaterial = {
                plastic: "Plásticos",
                paper: "Papel e Papelão",
                glass: "Vidro",
                metal: "Metal",
                electronic: "Eletrônicos",
                organic: "Orgânicos"
            }[answers[1]];

            const shareText = `🌱 Descobri onde reciclar ${selectedMaterial} em Niterói usando o EcoNiterói! Faça você também o quiz e contribua para uma cidade mais sustentável. #EcoNiterói #Reciclagem #Sustentabilidade`;

            if (navigator.share) {
                navigator.share({
                    title: 'EcoNiterói - Reciclagem Inteligente',
                    text: shareText,
                    url: window.location.href
                });
            } else {
                // Fallback para navegadores que não suportam Web Share API
                navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
                    alert('Link copiado para a área de transferência!');
                });
            }
        }

        // Expandir base de dados com mais locais e materiais
        const expandedLocations = {
            // Plásticos
            plastic: {
                small: {
                    icarai: [
                        { name: "Supermercado Guanabara Icaraí", address: "Rua Moreira César, 221 - Icaraí", hours: "Seg-Dom: 7h-22h", type: "Ponto de coleta PET" },
                        { name: "Ecoponto Plaza Shopping", address: "Rua XV de Novembro, 8 - Centro", hours: "Seg-Sáb: 10h-22h", type: "Ecoponto completo" }
                    ],
                    itaipu: [
                        { name: "Cooperativa Mutirão", address: "Estrada Francisco da Cruz Nunes, 6501 - Itaipu", hours: "Seg-Sex: 8h-17h", type: "Cooperativa de reciclagem" },
                        { name: "Extra Itaipu", address: "Estrada Caetano Monteiro, 1200 - Itaipu", hours: "Seg-Dom: 8h-22h", type: "Ecoponto supermercado" }
                    ],
                    pendotiba: [
                        { name: "Ponto Verde Pendotiba", address: "Rua Desembargador Lima Castro, 94 - Pendotiba", hours: "Seg-Sex: 8h-17h", type: "Ponto de coleta municipal" }
                    ],
                    sao_francisco: [
                        { name: "Marina da Glória", address: "Av. Infante Dom Henrique - Glória", hours: "Seg-Sex: 9h-17h", type: "Ponto de coleta" }
                    ]
                },
                medium: {
                    icarai: [
                        { name: "Central de Triagem Icaraí", address: "Rua Miguel de Frias, 77 - Icaraí", hours: "Seg-Sex: 8h-16h", type: "Central de reciclagem" }
                    ],
                    itaipu: [
                        { name: "EcoItaipu", address: "Estrada Francisco da Cruz Nunes, 8000 - Itaipu", hours: "Seg-Sáb: 8h-17h", type: "Centro de reciclagem" }
                    ]
                },
                large: {
                    icarai: [
                        { name: "COMLURB Coleta Especial", address: "Agende pelo telefone: (21) 2620-8080", hours: "Seg-Sex: 8h-17h", type: "Coleta domiciliar" }
                    ]
                }
            },
            // Papel
            paper: {
                small: {
                    icarai: [
                        { name: "Livraria Saraiva Niterói Shopping", address: "Rua Visconde do Rio Branco, 701 - São Domingos", hours: "Seg-Sáb: 10h-22h", type: "Programa de reciclagem de livros" },
                        { name: "Correios Centro", address: "Rua Visconde de Sepetiba, 987 - Centro", hours: "Seg-Sex: 9h-17h", type: "Coleta de papel" }
                    ],
                    itaipu: [
                        { name: "Escola Municipal Herbert de Souza", address: "Rua Jornalista Ferreira Lima, 15 - Itaipu", hours: "Seg-Sex: 7h-17h", type: "Ponto de coleta escolar" }
                    ]
                }
            },
            // Eletrônicos
            electronic: {
                small: {
                    icarai: [
                        { name: "GreenTech Reciclagem", address: "Rua Presidente Backer, 113 - Icaraí", hours: "Seg-Sex: 9h-18h, Sáb: 9h-14h", type: "Especializada em eletrônicos" },
                        { name: "Magazine Luiza Centro", address: "Rua da Conceição, 77 - Centro", hours: "Seg-Sáb: 9h-19h", type: "Logística reversa" },
                        { name: "Fast Shop Niterói", address: "Rua Visconde do Rio Branco, 701 - São Domingos", hours: "Seg-Sáb: 10h-22h", type: "Troca de eletrônicos" }
                    ],
                    itaipu: [
                        { name: "TechRecycle Itaipu", address: "Estrada Francisco da Cruz Nunes, 5500 - Itaipu", hours: "Seg-Sex: 9h-17h", type: "Reciclagem de eletrônicos" }
                    ]
                },
                medium: {
                    icarai: [
                        { name: "Centro de Descarte Eletrônico UFF", address: "Rua Miguel de Frias, 9 - Icaraí", hours: "Seg-Sex: 8h-17h", type: "Projeto universitário" }
                    ]
                }
            },
            // Vidro
            glass: {
                small: {
                    icarai: [
                        { name: "Vidraçaria São Pedro", address: "Rua Quinze de Novembro, 234 - Centro", hours: "Seg-Sex: 8h-18h, Sáb: 8h-14h", type: "Coleta de vidros" },
                        { name: "Cooperativa Mão na Massa", address: "Rua Presidente Pedreira, 98 - Ingá", hours: "Seg-Sex: 7h-16h", type: "Cooperativa de reciclagem" }
                    ]
                }
            },
            // Metal
            metal: {
                small: {
                    icarai: [
                        { name: "Ferro Velho do João", address: "Rua São João, 445 - São Lourenço", hours: "Seg-Sex: 8h-17h, Sáb: 8h-12h", type: "Compra de metais" },
                        { name: "Recicla Metal", address: "Av. Visconde do Rio Branco, 1550 - São Lourenço", hours: "Seg-Sex: 8h-17h", type: "Reciclagem de metais" }
                    ]
                }
            },
            // Orgânicos
            organic: {
                small: {
                    icarai: [
                        { name: "Horto do Fonseca", address: "Rua Desembargador Leopoldo Muylaert, 307 - Fonseca", hours: "Seg-Dom: 6h-18h", type: "Compostagem comunitária" },
                        { name: "Feira Orgânica de Icaraí", address: "Praia de Icaraí - em frente ao MAC", hours: "Terças: 7h-13h", type: "Compostagem na feira" }
                    ]
                }
            }
        };

        // Função melhorada para gerar recomendações
        function generateEnhancedRecommendation() {
            const material = answers[1];
            const quantity = answers[2];
            const transport = answers[3];
            const region = answers[4];

            // Dicas específicas por material
            const materialTips = {
                plastic: [
                    "Retire tampas e rótulos sempre que possível",
                    "Lave bem as embalagens para remover resíduos",
                    "Separe por tipo: PET (1), PEAD (2), PVC (3), etc.",
                    "Não amasse muito as garrafas PET - facilita a triagem"
                ],
                paper: [
                    "Remova grampos, fitas adesivas e plásticos",
                    "Não misture papel molhado ou sujo de gordura",
                    "Desmonte caixas de papelão para otimizar espaço",
                    "Papéis coloridos e brancos podem ser misturados"
                ],
                glass: [
                    "Separe por cores: transparente, verde, âmbar",
                    "Retire tampas metálicas ou plásticas",
                    "Embale com cuidado para evitar acidentes",
                    "Vidros quebrados devem ser embalados em jornal"
                ],
                metal: [
                    "Lave latas para remover restos de alimentos",
                    "Separe alumínio de outros metais",
                    "Retire rótulos de papel quando possível",
                    "Metais ferrosos são aceitos na maioria dos locais"
                ],
                electronic: [
                    "Faça backup e exclua dados pessoais",
                    "Mantenha acessórios e cabos juntos",
                    "Remova baterias se possível (destino separado)",
                    "Procure pontos especializados em REEE"
                ],
                organic: [
                    "Evite carnes, ossos e laticínios na compostagem",
                    "Corte em pedaços menores para acelerar decomposição",
                    "Misture materiais 'verdes' e 'marrons'",
                    "Mantenha umidade adequada no composto"
                ]
            };

            // Buscar locais na base expandida
            let locations = [];
            if (expandedLocations[material] && 
                expandedLocations[material][quantity] && 
                expandedLocations[material][quantity][region]) {
                locations = expandedLocations[material][quantity][region];
            } else if (expandedLocations[material] && expandedLocations[material]['small'] && expandedLocations[material]['small'][region]) {
                locations = expandedLocations[material]['small'][region];
            } else {
                // Locais genéricos de fallback
                locations = [
                    {
                        name: "Ecoponto Municipal Central",
                        address: "Rua Visconde do Rio Branco, 701 - São Domingos",
                        hours: "Seg-Sex: 8h-17h",
                        type: "Ponto de coleta municipal"
                    },
                    {
                        name: "COMLURB - Coleta Seletiva",
                        address: "Consulte cronograma no site da prefeitura",
                        hours: "Conforme calendário da sua rua",
                        type: "Coleta domiciliar seletiva"
                    }
                ];
            }

            // Conselhos personalizados baseados nas respostas
            let customAdvice = "";
            
            if (transport === 'none') {
                customAdvice = "Sem transporte próprio, recomendamos coordenar com vizinhos ou aguardar a coleta seletiva. ";
            } else if (transport === 'bike') {
                customAdvice = "Com bicicleta, faça várias viagens menores e embale bem os materiais. ";
            } else {
                customAdvice = "Com carro, você pode otimizar levando diferentes tipos de materiais numa só viagem. ";
            }

            if (quantity === 'large') {
                customAdvice += "Para grandes volumes, algumas cooperativas fazem coleta no local mediante agendamento. ";
            }

            // Benefícios ambientais específicos
            const environmentalBenefits = {
                plastic: "Cada tonelada de plástico reciclado evita a extração de 1,5 toneladas de petróleo e economiza até 2.000 litros de água.",
                paper: "Uma tonelada de papel reciclado preserva cerca de 17 árvores adultas e economiza 50% da energia comparado ao papel virgem.",
                glass: "O vidro pode ser 100% reciclado infinitas vezes sem perder qualidade, economizando 32% da energia de produção.",
                metal: "Reciclar alumínio economiza 95% da energia necessária para produzir o metal primário.",
                electronic: "A reciclagem de eletrônicos recupera metais preciosos e evita que substâncias tóxicas contaminem o solo.",
                organic: "A compostagem reduz em até 30% o volume de lixo doméstico e produz adubo natural."
            };

            return {
                tips: materialTips[material] || [],
                locations: locations,
                customAdvice: customAdvice,
                environmentalBenefit: environmentalBenefits[material] || "Contribui para um meio ambiente mais limpo e sustentável."
            };
        }

        // Atualizar função showResult para usar a versão melhorada
        function showResult() {
            const recommendations = generateEnhancedRecommendation();
            const materialTypes = {
                plastic: { icon: "🥤", name: "Plásticos" },
                paper: { icon: "📄", name: "Papel e Papelão" },
                glass: { icon: "🍺", name: "Vidro" },
                metal: { icon: "🥫", name: "Metal" },
                electronic: { icon: "📱", name: "Eletrônicos" },
                organic: { icon: "🍎", name: "Orgânicos" }
            };

            const selectedMaterial = materialTypes[answers[1]];
            
            document.getElementById('progressFill').style.width = '100%';
            
            const container = document.getElementById('questionContainer');
            container.innerHTML = `
                <div class="result-container">
                    <div class="result-icon">${selectedMaterial.icon}</div>
                    <div class="result-title">Guia Completo: ${selectedMaterial.name}</div>
                    
                    <div class="result-content">
                        <h3 style="color: #667eea; margin-bottom: 15px;">🎯 Recomendação Personalizada</h3>
                        <p style="background: linear-gradient(135deg, #f0f4ff, #e8f0fe); padding: 20px; border-radius: 12px; border-left: 4px solid #667eea; margin-bottom: 20px;">
                            ${recommendations.customAdvice}
                        </p>
                        
                        <h3 style="color: #667eea; margin: 25px 0 15px 0;">📋 Como Preparar Corretamente</h3>
                        <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                            ${recommendations.tips.map((tip, index) => `
                                <div style="display: flex; align-items: flex-start; padding: 10px 0; ${index < recommendations.tips.length - 1 ? 'border-bottom: 1px solid #e2e8f0;' : ''}">
                                    <span style="color: #10b981; margin-right: 12px; font-size: 1.2rem;">✅</span>
                                    <span>${tip}</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <h3 style="color: #667eea; margin: 25px 0 15px 0;">📍 Pontos de Coleta em Niterói</h3>
                        ${recommendations.locations.map(location => `
                            <div class="location-card" style="transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.15)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.1)'">
                                <div class="location-name" style="font-size: 1.1rem;">${location.name}</div>
                                <div class="location-address" style="margin: 8px 0;">📍 ${location.address}</div>
                                <div class="location-hours" style="margin: 5px 0;">🕐 ${location.hours}</div>
                                <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 6px 12px; border-radius: 20px; font-size: 0.8rem; margin-top: 10px; display: inline-block;">
                                    ${location.type}
                                </div>
                            </div>
                        `).join('')}
                        
                        <div style="background: linear-gradient(135deg, #e8f5e8, #f0f8f0); padding: 25px; border-radius: 16px; margin: 25px 0; border-left: 4px solid #10b981; position: relative; overflow: hidden;">
                            <div style="position: absolute; top: -10px; right: -10px; font-size: 4rem; opacity: 0.1;">🌱</div>
                            <h4 style="color: #065f46; margin-bottom: 12px; font-size: 1.2rem;">🌍 Impacto Ambiental</h4>
                            <p style="color: #065f46; margin: 0; line-height: 1.6; font-weight: 500;">
                                ${recommendations.environmentalBenefit}
                            </p>
                        </div>

                        <div style="background: linear-gradient(135deg, #fff7ed, #fef3c7); padding: 20px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                            <h4 style="color: #92400e; margin-bottom: 10px;">💡 Dica Extra</h4>
                            <p style="color: #92400e; margin: 0;">
                                Participe de grupos de reciclagem no seu bairro! Juntos, vocês podem organizar coletas coletivas e ter mais impacto positivo na comunidade.
                            </p>
                        </div>
                    </div>
                    
                    <div class="navigation" style="margin-top: 30px;">
                        <button class="btn" onclick="restartQuiz()" style="background: linear-gradient(135deg, #10b981, #059669);">
                            🔄 Novo Quiz
                        </button>
                        <button class="btn" onclick="shareResult()">
                            📤 Compartilhar
                        </button>
                        <button class="btn" onclick="showAllLocations()" style="background: linear-gradient(135deg, #f59e0b, #d97706);">
                            🗺️ Ver Todos os Pontos
                        </button>
                    </div>
                </div>
            `;
        }

        // Nova função para mostrar todos os pontos de coleta
        function showAllLocations() {
            const container = document.getElementById('questionContainer');
            let allLocations = [];

            // Compilar todos os locais
            Object.keys(expandedLocations).forEach(material => {
                Object.keys(expandedLocations[material]).forEach(quantity => {
                    Object.keys(expandedLocations[material][quantity]).forEach(region => {
                        expandedLocations[material][quantity][region].forEach(location => {
                            if (!allLocations.find(loc => loc.name === location.name)) {
                                allLocations.push({
                                    ...location,
                                    material: material,
                                    region: region
                                });
                            }
                        });
                    });
                });
            });

            const materialIcons = {
                plastic: "🥤",
                paper: "📄",
                glass: "🍺",
                metal: "🥫",
                electronic: "📱",
                organic: "🍎"
            };

            const regionNames = {
                icarai: "Icaraí/Centro",
                itaipu: "Itaipu/Camboinhas",
                pendotiba: "Pendotiba/Fonseca",
                sao_francisco: "São Francisco/Charitas"
            };

            container.innerHTML = `
                <div class="result-container">
                    <div class="result-icon">🗺️</div>
                    <div class="result-title">Todos os Pontos de Reciclagem</div>
                    
                    <div class="result-content">
                        <p style="text-align: center; margin-bottom: 25px; color: #666;">
                            Conheça todos os locais disponíveis para reciclagem em Niterói
                        </p>
                        
                        ${Object.keys(regionNames).map(region => `
                            <h3 style="color: #667eea; margin: 25px 0 15px 0; padding: 10px; background: #f8fafc; border-radius: 8px;">
                                📍 ${regionNames[region]}
                            </h3>
                            ${allLocations.filter(loc => loc.region === region).map(location => `
                                <div class="location-card">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                                        <div class="location-name">${location.name}</div>
                                        <div style="font-size: 1.5rem;">${materialIcons[location.material] || "♻️"}</div>
                                    </div>
                                    <div class="location-address">📍 ${location.address}</div>
                                    <div class="location-hours">🕐 ${location.hours}</div>
                                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 4px 10px; border-radius: 15px; font-size: 0.75rem; margin-top: 8px; display: inline-block;">
                                        ${location.type}
                                    </div>
                                </div>
                            `).join('')}
                        `).join('')}
                    </div>
                    
                    <div class="navigation">
                        <button class="btn" onclick="restartQuiz()">
                            ← Voltar ao Quiz
                        </button>
                    </div>
                </div>
            `;
        }

        // inica o quiz <<
        renderQuestion();