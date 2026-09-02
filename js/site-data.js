(function () {
  const t = (es, en, fr) => ({ es, en, fr });
  const dish = (es, en, fr, allergensEs, allergensEn, allergensFr, extra) => ({
    name: t(es, en, fr),
    allergens: t(allergensEs, allergensEn, allergensFr),
    extra: extra || null,
  });

  const allergens = {
    glutenFreeMolluscsSulphites: t(
      "Sin gluten · Moluscos · Sulfitos",
      "Gluten-free · Molluscs · Sulphites",
      "Sans gluten · Mollusques · Sulfites",
    ),
    glutenFreeSulphites: t("Sin gluten · Sulfitos", "Gluten-free · Sulphites", "Sans gluten · Sulfites"),
    glutenOptionEggFish: t(
      "Opción sin gluten · Gluten · Huevo · Pescado",
      "Gluten-free option · Gluten · Egg · Fish",
      "Option sans gluten · Gluten · Œuf · Poisson",
    ),
    glutenEggDairy: t("Gluten · Huevo · Lácteos", "Gluten · Egg · Dairy", "Gluten · Œuf · Produits laitiers"),
    glutenDairy: t("Gluten · Lácteos", "Gluten · Dairy", "Gluten · Produits laitiers"),
    glutenOptionEggSulphites: t(
      "Opción sin gluten · Gluten · Huevo · Sulfitos",
      "Gluten-free option · Gluten · Egg · Sulphites",
      "Option sans gluten · Gluten · Œuf · Sulfites",
    ),
    glutenOptionSulphites: t(
      "Opción sin gluten · Gluten · Sulfitos",
      "Gluten-free option · Gluten · Sulphites",
      "Option sans gluten · Gluten · Sulfites",
    ),
    glutenEggSulphites: t("Gluten · Huevo · Sulfitos", "Gluten · Egg · Sulphites", "Gluten · Œuf · Sulfites"),
    fishEggSulphites: t("Pescado · Huevo · Sulfitos", "Fish · Egg · Sulphites", "Poisson · Œuf · Sulfites"),
    fishShellfishGlutenEggDairySulphites: t(
      "Pescado · Crustáceos · Gluten · Huevo · Lácteos · Sulfitos",
      "Fish · Crustaceans · Gluten · Egg · Dairy · Sulphites",
      "Poisson · Crustacés · Gluten · Œuf · Produits laitiers · Sulfites",
    ),
    fish: t("Pescado", "Fish", "Poisson"),
    eggDairyNuts: t(
      "Huevo · Lácteos · Frutos de cáscara",
      "Egg · Dairy · Tree nuts",
      "Œuf · Produits laitiers · Fruits à coque",
    ),
    dairyNuts: t("Lácteos · Frutos de cáscara", "Dairy · Tree nuts", "Produits laitiers · Fruits à coque"),
    glutenEggDairyNuts: t(
      "Gluten · Huevo · Lácteos · Frutos de cáscara",
      "Gluten · Egg · Dairy · Tree nuts",
      "Gluten · Œuf · Produits laitiers · Fruits à coque",
    ),
    sulphites: t("Sulfitos", "Sulphites", "Sulfites"),
  };

  const shared = {
    pochas: dish(
      "Pochas a la navarra con almejas y piparras",
      "Navarre-style white beans with clams and piparras",
      "Haricots blancs à la navarraise, palourdes et piparras",
      allergens.glutenFreeMolluscsSulphites.es,
      allergens.glutenFreeMolluscsSulphites.en,
      allergens.glutenFreeMolluscsSulphites.fr,
    ),
    vegetables: dish(
      "Verdura de temporada",
      "Seasonal vegetables",
      "Légumes de saison",
      allergens.glutenFreeSulphites.es,
      allergens.glutenFreeSulphites.en,
      allergens.glutenFreeSulphites.fr,
    ),
    ensaladilla: dish(
      "Ensaladilla rusa con grissines",
      "Russian salad with grissini",
      "Salade russe avec gressins",
      allergens.glutenOptionEggFish.es,
      allergens.glutenOptionEggFish.en,
      allergens.glutenOptionEggFish.fr,
    ),
    pasta: dish(
      "Pasta del día",
      "Pasta of the day",
      "Pâtes du jour",
      allergens.glutenEggDairy.es,
      allergens.glutenEggDairy.en,
      allergens.glutenEggDairy.fr,
    ),
    risotto: dish(
      "Risotto de hongos con Idiazábal y parmesano",
      "Wild mushroom risotto with Idiazábal and Parmesan",
      "Risotto aux champignons, Idiazábal et parmesan",
      allergens.glutenDairy.es,
      allergens.glutenDairy.en,
      allergens.glutenDairy.fr,
    ),
    gazpacho: dish(
      "Gazpacho con picatostes, ibérico y huevo duro",
      "Gazpacho with croutons, Ibérico ham and boiled egg",
      "Gaspacho, croûtons, jambon ibérique et œuf dur",
      allergens.glutenOptionEggSulphites.es,
      allergens.glutenOptionEggSulphites.en,
      allergens.glutenOptionEggSulphites.fr,
    ),
    oxtail: dish(
      "Rabo tradicional con patatas fritas",
      "Traditional oxtail with fries",
      "Queue de bœuf traditionnelle avec frites",
      allergens.glutenOptionSulphites.es,
      allergens.glutenOptionSulphites.en,
      allergens.glutenOptionSulphites.fr,
    ),
    trotters: dish(
      "Manitas deshuesadas crujientes",
      "Crispy boneless pig's trotters",
      "Pieds de porc désossés et croustillants",
      allergens.glutenEggSulphites.es,
      allergens.glutenEggSulphites.en,
      allergens.glutenEggSulphites.fr,
    ),
    ajoarriero: dish(
      "Ajoarriero con huevo a baja temperatura",
      "Ajoarriero cod with slow-cooked egg",
      "Morue ajoarriero avec œuf basse température",
      allergens.fishEggSulphites.es,
      allergens.fishEggSulphites.en,
      allergens.fishEggSulphites.fr,
    ),
    peppers: dish(
      "Pimientos rellenos de merluza y gambas",
      "Peppers stuffed with hake and prawns",
      "Poivrons farcis au merlu et aux crevettes",
      allergens.fishShellfishGlutenEggDairySulphites.es,
      allergens.fishShellfishGlutenEggDairySulphites.en,
      allergens.fishShellfishGlutenEggDairySulphites.fr,
    ),
    fish: dish(
      "Pescado fresco del día con panaderas",
      "Fresh fish of the day with sliced baked potatoes",
      "Poisson frais du jour avec pommes de terre boulangères",
      allergens.fish.es,
      allergens.fish.en,
      allergens.fish.fr,
    ),
    entrecote: dish(
      "Entrecot con piquillos y patatas caseras",
      "Entrecôte with piquillo peppers and homemade fries",
      "Entrecôte, poivrons piquillo et frites maison",
      allergens.glutenOptionSulphites.es,
      allergens.glutenOptionSulphites.en,
      allergens.glutenOptionSulphites.fr,
      t("Suplemento +7 €", "Supplement +€7", "Supplément +7 €"),
    ),
    cheesecake: dish(
      "Cremoso de queso con Lotus y frutos rojos",
      "Creamy cheesecake with Lotus biscuit and red berries",
      "Crémeux au fromage, biscuit Lotus et fruits rouges",
      allergens.eggDairyNuts.es,
      allergens.eggDairyNuts.en,
      allergens.eggDairyNuts.fr,
    ),
    cuajada: dish(
      "Cuajada de Ultzama con miel y nueces",
      "Ultzama curd with honey and walnuts",
      "Caillé d’Ultzama au miel et aux noix",
      allergens.dairyNuts.es,
      allergens.dairyNuts.en,
      allergens.dairyNuts.fr,
    ),
    torrija: dish(
      "Torrija con helado de galleta",
      "French toast with biscuit ice cream",
      "Pain perdu avec glace au biscuit",
      allergens.glutenEggDairy.es,
      allergens.glutenEggDairy.en,
      allergens.glutenEggDairy.fr,
    ),
    irati: dish(
      "Queso de Irati con membrillo y nueces",
      "Irati cheese with quince paste and walnuts",
      "Fromage d’Irati, pâte de coing et noix",
      allergens.dairyNuts.es,
      allergens.dairyNuts.en,
      allergens.dairyNuts.fr,
    ),
    brownie: dish(
      "Brownie con helado de avellana",
      "Brownie with hazelnut ice cream",
      "Brownie avec glace à la noisette",
      allergens.glutenEggDairyNuts.es,
      allergens.glutenEggDairyNuts.en,
      allergens.glutenEggDairyNuts.fr,
    ),
    sorbet: dish(
      "Sorbete de mandarina al patxarán",
      "Mandarin and patxarán sorbet",
      "Sorbet mandarine au patxarán",
      allergens.sulphites.es,
      allergens.sulphites.en,
      allergens.sulphites.fr,
    ),
  };

  const menuDescriptions = new Map([
    ["Pochas a la navarra con almejas y piparras", t(
      "Alubia blanca tierna, muy típica de Navarra, guisada con almejas y el toque suave de las piparras.",
      "Tender white beans, a Navarre classic, cooked with clams and mild local piparra peppers.",
      "Haricots blancs tendres, spécialité de Navarre, cuisinés avec des palourdes et de douces piparras locales.",
    )],
    ["Verdura de temporada", t(
      "Selección de verduras en su mejor momento, cocinadas para conservar su sabor y textura.",
      "A selection of vegetables at their seasonal best, cooked to preserve their flavour and texture.",
      "Sélection de légumes au meilleur de leur saison, cuisinés pour préserver leur goût et leur texture.",
    )],
    ["Ensaladilla rusa con grissines", t(
      "Ensalada cremosa de patata y verduras, servida fría con crujientes palitos de pan.",
      "A chilled, creamy potato and vegetable salad served with crisp breadsticks.",
      "Salade froide et crémeuse de pommes de terre et légumes, accompagnée de gressins croustillants.",
    )],
    ["Pasta del día", t(
      "Pasta preparada con la salsa elegida por cocina para el menú de hoy.",
      "Pasta prepared with the kitchen's chosen sauce for today's menu.",
      "Pâtes préparées avec la sauce choisie par la cuisine pour le menu du jour.",
    )],
    ["Risotto de hongos con Idiazábal y parmesano", t(
      "Arroz meloso con hongos y dos quesos intensos: Idiazábal navarro y parmesano.",
      "Creamy mushroom rice with two distinctive cheeses: Navarre Idiazábal and Parmesan.",
      "Riz crémeux aux champignons et deux fromages de caractère : Idiazábal navarrais et parmesan.",
    )],
    ["Gazpacho con picatostes, ibérico y huevo duro", t(
      "Sopa fría de tomate, ligera y refrescante, acompañada de ibérico, huevo y pan crujiente.",
      "A light, refreshing chilled tomato soup topped with Ibérico ham, egg and crunchy bread.",
      "Soupe froide de tomate, légère et rafraîchissante, garnie de jambon ibérique, d'œuf et de pain croustillant.",
    )],
    ["Rabo tradicional con patatas fritas", t(
      "Rabo de vacuno cocinado lentamente hasta quedar muy tierno, con salsa intensa y patatas fritas.",
      "Beef oxtail slow-cooked until very tender, served with a rich sauce and fries.",
      "Queue de bœuf mijotée jusqu'à devenir très tendre, servie avec une sauce riche et des frites.",
    )],
    ["Manitas deshuesadas crujientes", t(
      "Manitas de cerdo deshuesadas: crujientes por fuera y melosas por dentro.",
      "Boneless pig's trotters: crisp on the outside and soft, rich and tender inside.",
      "Pieds de porc désossés : croustillants à l'extérieur, fondants et moelleux à l'intérieur.",
    )],
    ["Ajoarriero con huevo a baja temperatura", t(
      "Bacalao desmigado al estilo navarro, acompañado de huevo cocinado lentamente.",
      "Flaked cod prepared in the traditional Navarre ajoarriero style, with a slow-cooked egg.",
      "Morue effilochée à la manière traditionnelle de l'ajoarriero navarrais, avec un œuf basse température.",
    )],
    ["Pimientos rellenos de merluza y gambas", t(
      "Pimientos suaves rellenos de merluza y gambas, una combinación clásica del norte de España.",
      "Mild peppers filled with hake and prawns, a classic combination from northern Spain.",
      "Poivrons doux farcis au merlu et aux crevettes, un grand classique du nord de l'Espagne.",
    )],
    ["Pescado fresco del día con panaderas", t(
      "Pescado seleccionado según mercado, servido con patatas panadera cocinadas al horno.",
      "Market-selected fresh fish served with oven-baked sliced potatoes.",
      "Poisson frais sélectionné selon le marché, servi avec des pommes de terre boulangères au four.",
    )],
    ["Entrecot con piquillos y patatas caseras", t(
      "Corte de vacuno a la plancha, acompañado de pimientos del piquillo y patatas caseras.",
      "Grilled beef steak served with sweet piquillo peppers and homemade fries.",
      "Pièce de bœuf grillée, accompagnée de poivrons piquillo doux et de frites maison.",
    )],
    ["Cremoso de queso con Lotus y frutos rojos", t(
      "Postre suave y cremoso de queso, con galleta Lotus y el contraste ácido de los frutos rojos.",
      "A smooth, creamy cheese dessert with Lotus biscuit and the fresh acidity of red berries.",
      "Dessert au fromage doux et crémeux, avec biscuit Lotus et la fraîche acidité des fruits rouges.",
    )],
    ["Cuajada de Ultzama con miel y nueces", t(
      "Postre lácteo tradicional del valle de Ultzama, servido con miel y nueces.",
      "A traditional milk curd from the Ultzama valley, served with honey and walnuts.",
      "Caillé traditionnel de la vallée d'Ultzama, servi avec du miel et des noix.",
    )],
    ["Torrija con helado de galleta", t(
      "Pan empapado y caramelizado, tierno por dentro, acompañado de helado de galleta.",
      "Soaked and caramelised bread, soft inside, served with biscuit ice cream.",
      "Pain imbibé et caramélisé, moelleux à cœur, accompagné de glace au biscuit.",
    )],
    ["Queso de Irati con membrillo y nueces", t(
      "Queso de oveja del Pirineo navarro, servido con dulce de membrillo y nueces.",
      "Sheep's cheese from the Navarre Pyrenees, served with quince paste and walnuts.",
      "Fromage de brebis des Pyrénées navarraises, servi avec pâte de coing et noix.",
    )],
    ["Brownie con helado de avellana", t(
      "Bizcocho denso de chocolate acompañado de un cremoso helado de avellana.",
      "A rich, dense chocolate cake served with creamy hazelnut ice cream.",
      "Gâteau au chocolat dense et gourmand, accompagné d'une glace crémeuse à la noisette.",
    )],
    ["Sorbete de mandarina al patxarán", t(
      "Sorbete cítrico y refrescante con un toque de patxarán, licor tradicional navarro.",
      "A refreshing citrus sorbet with a touch of patxarán, Navarre's traditional sloe liqueur.",
      "Sorbet d'agrumes rafraîchissant avec une touche de patxarán, liqueur traditionnelle navarraise.",
    )],
    ["Crepe de boletus con salsa trufada", t(
      "Crepe fino relleno de boletus, terminado con una salsa cremosa aromatizada con trufa.",
      "A thin crêpe filled with boletus mushrooms and finished with a creamy truffle sauce.",
      "Crêpe fine farcie aux cèpes, nappée d'une sauce crémeuse parfumée à la truffe.",
    )],
    ["Callos estilo navarro", t(
      "Guiso tradicional de callos cocinado lentamente en una salsa sabrosa y ligeramente especiada.",
      "Traditional slow-cooked tripe in a rich, gently spiced Navarre-style sauce.",
      "Tripes mijotées à la manière navarraise dans une sauce riche et légèrement épicée.",
    )],
    ["Goxua caramelizada casera", t(
      "Postre vasco-navarro por capas, con nata, bizcocho y crema caramelizada.",
      "A layered Basque-Navarre dessert with cream, sponge cake and caramelised custard.",
      "Dessert basco-navarrais en couches, composé de crème, génoise et crème pâtissière caramélisée.",
    )],
  ]);

  window.siteData = {
    defaultLanguage: "es",
    languages: ["es", "en", "fr"],
    ui: {
      skip: t("Saltar al contenido", "Skip to content", "Aller au contenu"),
      languageLabel: t("Idioma", "Language", "Langue"),
      portalKicker: t("Cocina navarra · Pamplona", "Navarre cuisine · Pamplona", "Cuisine navarraise · Pampelune"),
      portalTitleTop: t("Tres formas.", "Three ways.", "Trois façons."),
      portalTitleBottom: t("Una mesa.", "One table.", "Une table."),
      portalCopy: t(
        "Elige cómo quieres descubrir Casa Paco.",
        "Choose how you want to discover Casa Paco.",
        "Choisissez comment découvrir Casa Paco.",
      ),
      experiencesLabel: t("Experiencias de Casa Paco", "Casa Paco experiences", "Expériences Casa Paco"),
      navigationLabel: t("Navegación de Casa Paco", "Casa Paco navigation", "Navigation Casa Paco"),
      carta: t("Carta", "À la carte", "Carte"),
      daily: t("Menú del día", "Weekday menu", "Menu du jour"),
      weekend: t("Menú fin de semana", "Weekend menu", "Menu du week-end"),
      weekendShort: t("Fin de semana", "Weekend", "Week-end"),
      cartaMeta: t("Todo el año", "All year round", "Toute l’année"),
      dailyMeta: t("Martes a viernes · 22 €", "Tuesday to Friday · €22", "Du mardi au vendredi · 22 €"),
      weekendMeta: t("Sábados y domingos · 37 €", "Saturday and Sunday · €37", "Samedi et dimanche · 37 €"),
      reservations: t("Reservas", "Bookings", "Réservations"),
      menuConditionsLabel: t("Condiciones del menú", "Menu conditions", "Conditions du menu"),
      breadExtra: t("Pan extra · 1 €", "Extra bread · €1", "Pain supplémentaire · 1 €"),
      terraceService: t("Servicio de terraza · 1 €", "Terrace service · €1", "Service en terrasse · 1 €"),
      halfMenu: t("Posibilidad de medio menú", "Half menu available", "Demi-menu disponible"),
      noSharing: t("No se permite compartir menú", "Menu cannot be shared", "Menu non partageable"),
      askAllergens: t(
        "Consulta al personal en caso de alergias",
        "Ask the team about allergies",
        "Consultez l’équipe en cas d’allergies",
      ),
      allergensTitle: t("Alérgenos", "Allergens", "Allergènes"),
      gluten: t("Gluten", "Gluten", "Gluten"),
      crustaceans: t("Crustáceos", "Crustaceans", "Crustacés"),
      egg: t("Huevo", "Egg", "Œuf"),
      fish: t("Pescado", "Fish", "Poisson"),
      dairy: t("Lácteos", "Dairy", "Produits laitiers"),
      nuts: t("Frutos de cáscara", "Tree nuts", "Fruits à coque"),
      sulphites: t("Sulfitos", "Sulphites", "Sulfites"),
      molluscs: t("Moluscos", "Molluscs", "Mollusques"),
      footer: t(
        "Casa Paco · Cocina navarra en Pamplona",
        "Casa Paco · Navarre cuisine in Pamplona",
        "Casa Paco · Cuisine navarraise à Pampelune",
      ),
    },
    menus: {
      "menu-del-dia": {
        eyebrow: t("Martes a viernes · Pamplona", "Tuesday to Friday · Pamplona", "Du mardi au vendredi · Pampelune"),
        title: t("Menú del día", "Weekday menu", "Menu du jour"),
        included: t(
          "Incluye pan, vino del año, sidra, refresco, caña o agua.",
          "Includes bread, house wine, cider, soft drink, small beer or water.",
          "Comprend pain, vin de l’année, cidre, boisson sans alcool, petite bière ou eau.",
        ),
        courses: [
          { title: t("Primeros", "Starters", "Entrées"), dishes: [shared.pochas, shared.vegetables, shared.ensaladilla, shared.pasta, shared.risotto, shared.gazpacho] },
          { title: t("Segundos", "Main courses", "Plats"), dishes: [shared.oxtail, shared.trotters, shared.ajoarriero, shared.peppers, shared.fish, shared.entrecote] },
          { title: t("Postres", "Desserts", "Desserts"), dishes: [shared.cheesecake, shared.cuajada, shared.torrija, shared.irati, shared.brownie, shared.sorbet] },
        ],
      },
      "menu-fin-de-semana": {
        eyebrow: t("Sábados y domingos · Navarra", "Saturday and Sunday · Navarre", "Samedi et dimanche · Navarre"),
        title: t("Menú fin de semana", "Weekend menu", "Menu du week-end"),
        included: t(
          "Incluye pan, vino crianza, sidra, refresco, caña o agua.",
          "Includes bread, crianza wine, cider, soft drink, small beer or water.",
          "Comprend pain, vin crianza, cidre, boisson sans alcool, petite bière ou eau.",
        ),
        courses: [
          {
            title: t("Primeros", "Starters", "Entrées"),
            dishes: [
              shared.pochas,
              shared.vegetables,
              shared.ensaladilla,
              shared.pasta,
              dish("Crepe de boletus con salsa trufada", "Boletus crêpe with truffle sauce", "Crêpe aux cèpes, sauce truffée", allergens.glutenDairy.es, allergens.glutenDairy.en, allergens.glutenDairy.fr),
              shared.risotto,
              shared.gazpacho,
            ],
          },
          {
            title: t("Segundos", "Main courses", "Plats"),
            dishes: [
              shared.oxtail,
              shared.trotters,
              shared.ajoarriero,
              shared.peppers,
              shared.fish,
              dish("Callos estilo navarro", "Navarre-style tripe", "Tripes à la navarraise", allergens.glutenFreeSulphites.es, allergens.glutenFreeSulphites.en, allergens.glutenFreeSulphites.fr),
              shared.entrecote,
            ],
          },
          {
            title: t("Postres", "Desserts", "Desserts"),
            dishes: [
              dish("Cremoso de queso con Lotus y frutos rojos", "Creamy cheesecake with Lotus biscuit and red berries", "Crémeux au fromage, biscuit Lotus et fruits rouges", allergens.glutenEggDairy.es, allergens.glutenEggDairy.en, allergens.glutenEggDairy.fr),
              shared.cuajada,
              shared.torrija,
              shared.irati,
              shared.brownie,
              shared.sorbet,
              dish("Goxua caramelizada casera", "Homemade caramelised goxua", "Goxua maison caramélisé", allergens.glutenEggDairy.es, allergens.glutenEggDairy.en, allergens.glutenEggDairy.fr),
            ],
          },
        ],
      },
    },
  };

  Object.values(window.siteData.menus).forEach((menu) => {
    menu.courses.forEach((course) => {
      course.dishes.forEach((menuDish) => {
        menuDish.description = menuDescriptions.get(menuDish.name.es) || t(
          "Preparación casera de Casa Paco.",
          "A homemade Casa Paco preparation.",
          "Une préparation maison de Casa Paco.",
        );
      });
    });
  });
})();
