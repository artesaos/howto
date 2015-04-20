# Artesaos - How To

Guias da comunidade Laravel Brasil

Contribua!!

# Sistema de Tags

A cada novo post você deve adicionar ou verificar as tags no topo do post:
```
---
title: O título do post
tags: [slug-tag1, slug-tag2, slug-tag3]
---
```

E verificar se as tags estão mapeadas em `_data/tags.yml`. Não estando, você deve adicionar a tag no seguinte formato:
```yaml
- slug: slug-tag1
  name: Slug da Tag 1
```

E em seguida, criar um arquivo `tag/slug-tag1.md`:
```
---
layout: posts_by_tag
tag: slug-tag1
permalink: slug-tag1/
---
```

e pronto.

