# Desarrollo de una base de datos para evaluación automática de sistemas de texto a habla
Repositorio donde se almacena el codígo vinculado al desarrollo de mi tesis de grado, por el titulo de Ingeniero de Sonido, en la UNTREF. Para comprender mejor el contenido de este repositorio, se recomienda leer la tesis. El archivo mas relevante se encuentra en analysis/subjective_results_corrected.csv. En el mismo, se encuentran los resultados de las evaluaciones subjetivas de los sistemas de texto a habla, en total 4327 calificaciones de audios unicos, probistas por 92 evaluadores. la estructura de este archivo es la siguiente:

+ `participant_id`: Identificador unico del evaluador.
+ `age`,`gender_participant`,`country`,`province`: Datos sociodemograficos del evaluador.
+ `education`: Nivel de familiaridad con voces sinteticas.
+ `stimuli`: Código del audio evaluado.
+ `stimuli_service`: Servicio que genero el audio.
+ `gender_stimuli`: Genero de la voz sintetica.
+ `dialect`: Dialecto de la voz sintetica. 

## Estructura del repositorio

El repositorio se encuentra dividido en las siguintes carpetas principales:

+ analysis: Contiene los scripts de preprocesamiento y análisis estadistico  de los datos recolectados en la prueba subjetiva.
+ backend: Contiene los scripts de la base de datos y el servidor web.
+ classifier: Contiene los scripts de entrenamiento y evaluación de los clasificadores DenseMOS desarrollados en la tesis, incluyendo los splits de entrenamiento, validación y testeo utilizados
+ embeddings: Contiene los scripts de extracción de embeddings de los audios evaluados.
+ frontend: Contiene los scripts de la interfaz web.
+ NISQA: Link al repositorio de NISQA.
+ NISQA_analysis: Contiene los scripts de finetuneo y evaluación de modelos de NISQA.
+ write-up: Contiene archivos de referencia y las figuras utilizadas en la tesis, así como un .zip con el código de latex de la misma.

## Audios evaluados
Si se requiere acceder a los audios evaluados, se puede solicitar enviado un mail a aleandrososawelford [arroba] gmail [punto] com.