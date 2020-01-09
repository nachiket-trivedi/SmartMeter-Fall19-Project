# Smart Meter
Optimising Load Scheduling using nature inspired Particle Swarm Optimization with application hosted on ***IBM Cloud integrated with IBM Watson Assistant Chatbot. The Demo URL for the project deployed on Kubernetes Cluster Serviced provided by IBM Cloud is: http://184.172.234.236:31842/***

# Abstract

- Electricity Utility Providers are faced with the challenge of meeting up with the demands of consumers throughout the day. Most importantly, the demands that occur during the peak hours of the day. Since, electricity cannot be stored in bulk, these utility providers daily face the challenge of reducing the gap between supply & demand of electricity units in those peak hours.
- Inspired by the above issue, we hope to build a Model that can work to reduce the load demands during the peak hours of the day by subtly shifting the demands to non-peak hours, while taking into consideration factors such as customer satisfaction, maximum supply limit of utility, monetary costs, etc. 
- The core of the idea is development of a Load Scheduling Model that can optimally meet the demands of both the consumers & the utility providers. To enable the full potential, we hope to monitor & schedule appliances of household via our model by making use of IoT. 
- Along with shifting of loads to non-peak hours, model would also take into consideration the overall cost reduced in user's electricity bill along with the comfortability level of the user with the proposed schedule.
- The idea holds scope for implementation of the Model for an entire community of households with One Master metering unit communicating with each household's individual smart meter for reducing the load during peak hours for an entire community. 

# Goal of the Project

The goal of the project would be to reduce the peak hours load of consumers by shifting the load during non-peak hours by providing them with incentives. Thus we would want to reduce the Peak-to-Average-Ratio (PAR) of a consumer's load profile so that it can be flattened as much as possible. Thus reducing the peak demands would directly benefit the utility providers in meeting the demands of all consumers without looking for options of building new generation systems and bigger storage units thus incurring huge additional investment. Consumers would also be directly benefitted by this model with savings in their monthly electricity bills and a satisfaction of saving of environment with their minimal efforts. 

# Architecture

![Architecture-Diagram](https://github.com/SJSUFall2019-CMPE272/Smart-Meter/blob/master/Project%20Architecture.jpeg)

![IBM-Kubernetes-Cluster](https://github.com/SJSUFall2019-CMPE272/Smart-Meter/blob/master/ibm%20kubernetes%20cluster.png)

![IBM-Kubernetes-Dashboard](https://github.com/SJSUFall2019-CMPE272/Smart-Meter/blob/master/Kubernetes%20Dashboard.png)

![IBM-Registry](https://github.com/SJSUFall2019-CMPE272/Smart-Meter/blob/master/Repositories%20on%20IBM%20Cloud.png)


IBM-Watson-Assistant             |  IBM-Watson-Assistant
:-------------------------:|:-------------------------:
![IBM-Watson-Assistant-1](https://github.com/SJSUFall2019-CMPE272/Smart-Meter/blob/master/IBM%20Watson%20Assistant%20-%201%20.png)  |  ![IBM-Watson-Assistant-2](https://github.com/SJSUFall2019-CMPE272/Smart-Meter/blob/master/IBM%20Watson%20Assistant%20-%202.png)

# Technology Stack (Tentative)

- **Client side:** React
- **Server side:** Node, Express, 
- **Pipeline: Kafka(pipeline and filter data)**
- **Database:** MongoDB
- **Cloud: IBM Cloud, Docker, IBM Watson Assistant Chatbot, AWS(EC2 & ECS)**
- **Algortihmic implementation:** Particle Swarm Optimization

# Utility Company (PG&E's opinion)

We had an interaction with one of the PG&E representative over the phone where we told him about our project. To start with, he was impressed that we were thinking of doing something in this area. We took their feedback on the project which included the following major points:

  - Smart Meter would be more beneficial when it covers large number of households.
  - PG&E people are not worried if the load demand peak is shifted during night hours. During day time, they have to meet the demands of industries, farmers, IT sector in addition to consumer households.
  - Much of the day time is reduced at night and only household play a major role during night hours.
  - It would be more effective if we could incorporate installed solar energy at user households in our load scheduling alogrithm.
  
# Customer's Opinion

As of now, we have surveyed two households regarding the installation of smart meter in their households. The household consisted both working parents with two school going children. Their common feedback is as follows:

  - Machines these days such as dishwasher, washing machine, cloth dryer are already coming with a feature to manually schedule the appliance which the households regularly use.
  - It would be beneficial if we could provide each household with an analysis of how much their usage was for the day and which appliance consume how much units.
  - The time of manual scheduling of appliances is a decision done manually. If a better scheduling which could provide less electricity rate would be appreciated.
  - One of the household had installed solar panels and thus wanted to know if our system would be incorporating the solary energy. 


# User Persona

This application will help home owners in load scheduling of appliances during off-peak hours of the day. The application will try to run the load during hours where the cost of usage will be less. At the same time, when the application is extended to an entire community, it would directly help the utility companies to better plan out and provide with a cheaper rate to users due to the load being shifted to off-peak hours of the day. So, this system could potentially help both the residential customers and the utility companies.


# Hill Statement

Users who want to reduce their electricity bill by willing to shift their operating hours of appliances. Also, when implemented on a large scale, it would also flatten the load profile of the users by reducing the PAR of an average customer's load profile and thus there won't be a spike in load during peak hours thus helping the utility companies to provide consumers with a cheaper rate plan. 


# Team Members
1) [Aditya Mantri](http://github.com/aditya-edu)
2) [Nachiket Trivedi](https://github.com/nachiket-trivedi)
3) [Nishant Jani](https://github.com/NishantKJani)
4) [Sarthak Jain](https://github.com/sarthakjain27)
