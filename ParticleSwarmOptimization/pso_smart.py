from flask import Flask, request
from flask_cors import CORS
import time

import numpy as np
import random as rnd

app = Flask(__name__)
CORS(app)
default_appliances = ("Pool Pump", "Cloth Dryer", "Iron", "Dish Washer", "Vacuum Cleaner", "Washing Machine",
                      "Air Conditioner", "Television", "Heater", "Default")

# rating in kwh
default_rating = {"Pool Pump": 1.1, "Cloth Dryer": 1.8, "Iron": 0.45, "Dish Washer": 0.8, "Vacuum Cleaner": 0.5,
                  "Washing Machine": 1.3, "Air Conditioner": 1.2, "Television": 0.13, "Heater": 1.5, "Default": 0.7}

# how many hours the appliance should run
default_operating_hours = {"Pool Pump": 2, "Cloth Dryer": 3, "Iron": 2, "Dish Washer": 2, "Vacuum Cleaner": 2,
                           "Washing Machine": 2, "Air Conditioner": 3, "Television": 4, "Heater": 3, "Default": 2}

# each appliance's lowest starting and highest starting time
default_lower_time = {"Pool Pump": 1, "Cloth Dryer": 1, "Iron": 9, "Dish Washer": 1, "Vacuum Cleaner": 9,
                      "Washing Machine": 1, "Air Conditioner": 1, "Television": 8, "Heater": 1, "Default": 1}
default_upper_time = {"Pool Pump": 23, "Cloth Dryer": 22, "Iron": 19, "Dish Washer": 23, "Vacuum Cleaner": 19,
                      "Washing Machine": 23, "Air Conditioner": 23, "Television": 22, "Heater": 22, "Default": 22}

# each appliance's default present running timings
default_present_timings = {"Pool Pump": 15, "Cloth Dryer": 17, "Iron": 18, "Dish Washer": 20, "Vacuum Cleaner": 14,
                           "Washing Machine": 16, "Air Conditioner": 15, "Television": 12, "Heater": 17, "Default": 16}

default_area = 4

# Dissatisfaction for pool pump in terms of monetary benefit.
# Need to maximize satisfaction so minimize dissatisfaction. So hours where person is at home are positive value
# and hours where person is in office is negative value -> So we want to get the value as low as possible
dissatisfaction = {
    # 0-5hour-> 0.5, 6-21hour-> -0.25, 22-23hour-> 0.5
    # 6-21 hour person not at home so run then
    "Pool Pump": np.asarray(list(0.5 * np.ones(6)) + list(-0.25 * np.ones(16)) + list(0.5 * np.ones(2))),

    # 0-9hour-> -0.5, 10-13hour -> -0.3, 14-18hour -> -0.1, 19-23hour -> -0.5
    # clothes dry during early morning and late night hours.
    "Cloth Dryer": np.asarray(
        list(-0.5 * np.ones(10)) + list(-0.3 * np.ones(4)) + list(-0.1 * np.ones(5)) + list(-0.5 * np.ones(5))),

    # 0-9hour-> -0.5, 10-13hour -> -0.3, 14-18hour -> -0.1, 19-23hour -> -0.5
    # same as cloth dryer
    "Washing Machine": np.asarray(
        list(-0.5 * np.ones(10)) + list(-0.3 * np.ones(4)) + list(-0.1 * np.ones(5)) + list(-0.5 * np.ones(5))),

    # 0-6hour-> 0.4, 7-13hour -> -0.3, 14-18hour -> 0.3, 19-23hour -> -0.4
    # iron during morning and night
    "Iron": np.asarray(
        list(0.4 * np.ones(7)) + list(-0.4 * np.ones(7)) + list(0.3 * np.ones(5)) + list(-0.1 * np.ones(5))),

    # 0-7hour-> -0.6, 8-13hour -> 0.25, 14-18hour -> 0.5, 19-23hour -> -0.6
    # utensils cleaning preferred during night as collect all utensils and clean together at night
    "Dish Washer": np.asarray(
        list(-0.6 * np.ones(8)) + list(0.25 * np.ones(6)) + list(0.5 * np.ones(5)) + list(-0.6 * np.ones(5))),

    # 0-7hour-> 0.5, 8-13hour -> -0.5, 14-18hour -> 0.5, 19-23hour -> -0.4
    # vacuuming during morning and night hours
    "Vacuum Cleaner": np.asarray(
        list(0.5 * np.ones(8)) + list(-0.5 * np.ones(6)) + list(0.5 * np.ones(5)) + list(-0.1 * np.ones(5))),

    # 0-6hour-> -0.2, 7-12 hour -> -0.4, 13-19hour -> 0.4, 20-23hour->-0.2
    "Air Conditioner": np.asarray(
        list(-0.2 * np.ones(7)) + list(-0.4 * np.ones(6)) + list(0.4 * np.ones(7)) + list(-0.2 * np.ones(4))),

    # 0-6hour-> -0.4, 7-12 hour -> -0.1, 13-19hour -> 0.4, 20-23hour->-0.4
    "Heater": np.asarray(
        list(-0.4 * np.ones(7)) + list(-0.1 * np.ones(6)) + list(0.4 * np.ones(7)) + list(-0.4 * np.ones(4))),

    # 0-6hour-> -0.1, 7-12 hour -> -0.5, 13-19hour -> -0.2, 20-23hour->-0.5
    "Television": np.asarray(
        list(-0.1 * np.ones(7)) + list(-0.5 * np.ones(6)) + list(-0.2 * np.ones(7)) + list(-0.5 * np.ones(4))),

    # no dissatisfaction means person good with any time. So using time where cost
    # of running appliance will surely be low :p
    "Default": np.asarray(
        list(-0.6 * np.ones(8)) + list(0.25 * np.ones(6)) + list(0.5 * np.ones(5)) + list(-0.6 * np.ones(5)))
}

tariff_rate = {
    # 0-14hour->0.28243, 15-19->0.29672, 20-23->0.28243
    "winter_a_timing": np.asarray(
        list(0.28243 * np.ones(15)) + list(0.29672 * np.ones(5)) + list(0.28243 * np.ones(4))),

    # 0-15hour->0.28485, 16-20->0.30218, 21-23->0.28485
    "winter_b_timing": np.asarray(
        list(0.28485 * np.ones(16)) + list(0.30218 * np.ones(5)) + list(0.28485 * np.ones(3))),

    # 0-14hour->0.33912, 15-19->0.41469, 20-23->0.33912
    "summer_a_timing": np.asarray(
        list(0.33912 * np.ones(15)) + list(0.41469 * np.ones(5)) + list(0.33912 * np.ones(4))),

    # 0-15hour->0.32583, 16-20->0.38927, 21-23->0.32583
    "summer_b_timing": np.asarray(
        list(0.32583 * np.ones(16)) + list(0.38927 * np.ones(5)) + list(0.32583 * np.ones(3)))
}


# population is a list of dict
# power_rating -> object with appliance name and its power rating as value
# hours_of_operation -> object with appliance name and total hours to be operate for
# appliances -> list of appliance name
# a_timing is the E_TOU_A timing rate plan, make it false for using E_TOU_B
def costFunction(population, local_dissatisfaction, power_rating, hours_of_operation, appliances, timing,
                 renewable_energy):
    particle_diss = 0.0
    particle_cost = 0.0
    total_renewable = 0.0
    hour_info = {}
    appliance_level_info = {}

    # Looping through starting time of each appliance in the particle
    for appliance in appliances:
        app_diss = 0.0
        app_cost = 0.0

        # Taking each hour of operation for that appliance into consideration for rate and dissatisfaction value
        for hour in range(hours_of_operation[appliance]):
            hr = int(population[0][appliance] + hour) % 24
            app_diss += local_dissatisfaction[appliance][hr]
            app_cost += tariff_rate[timing][hr]

            if hr not in hour_info:
                each = {'load': power_rating[appliance], 'appliance': [appliance],
                        'cost': round(tariff_rate[timing][hr] * power_rating[appliance], 2)}
                hour_info[hr] = each
            else:
                hour_info[hr]['load'] += power_rating[appliance]
                hour_info[hr]['appliance'].append(appliance)
                hour_info[hr]['cost'] += round(tariff_rate[timing][hr] * power_rating[appliance], 2)

        # summing each appliance's dissatisfaction and cost in the particle
        particle_diss += power_rating[appliance] * app_diss
        particle_cost += power_rating[appliance] * app_cost

        each_appliance_dict = {'Total Running Hours': hours_of_operation[appliance],
                               'Power Rating in kW': power_rating[appliance],
                               'Cost Incurred': round(power_rating[appliance] * app_cost, 2)}

        appliance_level_info[appliance] = each_appliance_dict

    for hr in hour_info:
        # assuming units sold back to grid at same price of purchasing
        total_renewable += renewable_energy[hr] * tariff_rate[timing][hr]
        hour_info[hr]['renewable power available'] = renewable_energy[hr]
        hour_info[hr]['renewable selling amount'] = round(renewable_energy[hr] * tariff_rate[timing][hr], 2)

    fitness_values = particle_diss + particle_cost - total_renewable

    return fitness_values, hour_info, (particle_cost - total_renewable), appliance_level_info


def solar_energy():
    # irradiation values from PVsyst for 1st day of January in the city of Ifrane in Morrocco
    # need to find hourly irradiation values somehow
    # can be said these are the average values we are considering
    irradiation_values = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.097, 0.211, 0.228, 0.418, 0.424, 0.381, 0.351,
                          0.257, 0.156, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]

    # E = r * PR * A * I -> r (solar panel efficiency) ; PR (performance ratio, between theoretical and practical yield)
    # A -> Photovoltaic modules area ; I -> Irradiation value for that hour
    energy_generated = [0.16 * 0.75 * default_area * i for i in irradiation_values]

    return energy_generated


# Each particle has position, velocity, best_position objects and current and best fitness value
# cost_function is passed to calculateFitness of particle
# first velocity is updated using global best position and then position is updated of the particle
class Particle:
    def __init__(self, position, appliances):
        self.position_i = position  # particle's current position
        self.velocity_i = {}  # particle's current velocity
        self.pos_best_i = {}  # each particle's individual best position
        self.hourly_info = {}
        self.appliance_info = {}
        self.best_cost = 0.0
        self.fitness_best_i = 1000000  # each particle's individual best fitness value
        self.fitness_i = 1000000  # each particle's current fitness value

        for appliance in appliances:
            self.velocity_i[appliance] = rnd.uniform(-1, 1)

    # calculate fitness
    def calculateFitness(self, cost_function, local_dissatisfaction, power_rating, hours_of_operation, appliances, tariff_rate_policy,
                         renewable_energy):
        self.fitness_i, hour_info, cost_to_pay, appliance_level_info = cost_function([self.position_i], local_dissatisfaction, power_rating,
                                                                                     hours_of_operation,
                                                                                     appliances, tariff_rate_policy,
                                                                                     renewable_energy)

        # check to see if the current position is an individual best
        if self.fitness_i < self.fitness_best_i or self.fitness_best_i == 1000000:
            self.pos_best_i = self.position_i.copy()
            self.fitness_best_i = self.fitness_i
            self.hourly_info = hour_info
            self.best_cost = cost_to_pay
            self.appliance_info = appliance_level_info

    # compute new particle velocity
    def update_velocity(self, global_best_particle, appliances, current_iter, total_iter, wmax=0.9, wmin=0.4):
        # high w -> promotes exploitation, low w -> promotes exploration
        w = wmax - ((wmax - wmin) / total_iter) * current_iter  # Linear Decreasing Inertia Weight
        c1 = 2  # cognitive constant
        c2 = 2  # social constant

        for appliance in appliances:
            r1 = rnd.random()
            r2 = rnd.random()

            vel_cognitive = c1 * r1 * (self.pos_best_i[appliance] - self.position_i[appliance])
            vel_social = c2 * r2 * (global_best_particle[appliance] - self.position_i[appliance])
            self.velocity_i[appliance] = w * self.velocity_i[appliance] + vel_cognitive + vel_social

    # computer the particle's new position using new calculated velocities
    def update_position(self, appliances, lowerbounds, upperbounds):
        for appliance in appliances:
            self.position_i[appliance] = np.round(self.position_i[appliance] + self.velocity_i[appliance])

            # adjust maximum position
            if self.position_i[appliance] > upperbounds[appliance]:
                self.position_i[appliance] = upperbounds[appliance]

            # adjust minimum position
            if self.position_i[appliance] < lowerbounds[appliance]:
                self.position_i[appliance] = lowerbounds[appliance]


def initial_population_generation(numParticles, appliances, lowerTimeRange, upperTimeRange):
    # Generation of initial population of particles
    particles = []
    for particle_idx in range(numParticles):
        each_dict = {}
        for idx, appliance in enumerate(appliances):
            each_dict[appliance] = np.round(rnd.uniform(lowerTimeRange[appliance], upperTimeRange[appliance]))
        particles.append(Particle(each_dict, appliances))
    return particles


def PSO(cost_function, local_dissatisfaction, appliances, power_rating, hours_of_operation, lowerTimeRange,
        upperTimeRange, use_solar_power, tariff_rate_policy, numParticles=50, maxiter=300):
    fitness_best_global = 1000000  # best error for group
    position_best_global = {}  # best position for group
    hour_info = {}
    appliance_level_info = {}
    cost_best_global = {}

    renewable_energy = np.zeros(24)
    if use_solar_power:
        renewable_energy = solar_energy()

    particles = initial_population_generation(numParticles, appliances, lowerTimeRange, upperTimeRange)

    # Generation of offsprings and iteration through those offsprings
    idx = 0
    while idx < maxiter:
        # cycle through particles in swarm and evaluate fitness
        for particle_idx in range(numParticles):
            particles[particle_idx].calculateFitness(cost_function, local_dissatisfaction, power_rating,
                                                     hours_of_operation, appliances, tariff_rate_policy,
                                                     renewable_energy)

            # determine if current particle is globally the best having the minimum fitness value
            if particles[particle_idx].fitness_i < fitness_best_global or fitness_best_global == 1000000:
                position_best_global = particles[particle_idx].position_i
                fitness_best_global = particles[particle_idx].fitness_i
                hour_info = particles[particle_idx].hourly_info
                cost_best_global = particles[particle_idx].best_cost
                appliance_level_info = particles[particle_idx].appliance_info

        # Updation of velocities and position for next iteration
        for particle_idx in range(numParticles):
            particles[particle_idx].update_velocity(position_best_global, appliances, idx, maxiter - 1)
            particles[particle_idx].update_position(appliances, lowerTimeRange, upperTimeRange)
        idx = idx + 1

    # print final results
    print('\nFINAL SOLUTION:')
    print(f' Timings                                 > {position_best_global}')
    print(f' Cost to pay                             > {cost_best_global}')
    print(f' Load Info at scheduled hours            > {hour_info}')
    print(f' Appliance Info                          > {appliance_level_info}')

    return position_best_global, cost_best_global, hour_info, appliance_level_info


def calculate_present_cost(appliance_to_schedule, appliance_to_schedule_power, total_running_hours,
                           present_schedule, tariff_rate_policy):
    cost = 0.0
    for appliance in appliance_to_schedule:
        for idx in range(total_running_hours[appliance]):
            hr = int(present_schedule[appliance] + idx) % 24
            cost += tariff_rate[tariff_rate_policy][hr] * appliance_to_schedule_power[appliance]
    return cost


@app.route("/schedule", methods=['POST'])
def schedule_appliances():
    global dissatisfaction
    global default_area
    local_dissatisfaction = {
    # 0-5hour-> 0.5, 6-21hour-> -0.25, 22-23hour-> 0.5
    # 6-21 hour person not at home so run then
    "Pool Pump": np.asarray(list(0.5 * np.ones(6)) + list(-0.25 * np.ones(16)) + list(0.5 * np.ones(2))),

    # 0-9hour-> -0.5, 10-13hour -> -0.3, 14-18hour -> -0.1, 19-23hour -> -0.5
    # clothes dry during early morning and late night hours.
    "Cloth Dryer": np.asarray(
        list(-0.5 * np.ones(10)) + list(-0.3 * np.ones(4)) + list(-0.1 * np.ones(5)) + list(-0.5 * np.ones(5))),

    # 0-9hour-> -0.5, 10-13hour -> -0.3, 14-18hour -> -0.1, 19-23hour -> -0.5
    # same as cloth dryer
    "Washing Machine": np.asarray(
        list(-0.5 * np.ones(10)) + list(-0.3 * np.ones(4)) + list(-0.1 * np.ones(5)) + list(-0.5 * np.ones(5))),

    # 0-6hour-> 0.4, 7-13hour -> -0.3, 14-18hour -> 0.3, 19-23hour -> -0.4
    # iron during morning and night
    "Iron": np.asarray(
        list(0.4 * np.ones(7)) + list(-0.4 * np.ones(7)) + list(0.3 * np.ones(5)) + list(-0.1 * np.ones(5))),

    # 0-7hour-> -0.6, 8-13hour -> 0.25, 14-18hour -> 0.5, 19-23hour -> -0.6
    # utensils cleaning preferred during night as collect all utensils and clean together at night
    "Dish Washer": np.asarray(
        list(-0.6 * np.ones(8)) + list(0.25 * np.ones(6)) + list(0.5 * np.ones(5)) + list(-0.6 * np.ones(5))),

    # 0-7hour-> 0.5, 8-13hour -> -0.5, 14-18hour -> 0.5, 19-23hour -> -0.4
    # vacuuming during morning and night hours
    "Vacuum Cleaner": np.asarray(
        list(0.5 * np.ones(8)) + list(-0.5 * np.ones(6)) + list(0.5 * np.ones(5)) + list(-0.1 * np.ones(5))),

    # 0-6hour-> -0.2, 7-12 hour -> -0.4, 13-19hour -> 0.4, 20-23hour->-0.2
    "Air Conditioner": np.asarray(
        list(-0.2 * np.ones(7)) + list(-0.4 * np.ones(6)) + list(0.4 * np.ones(7)) + list(-0.2 * np.ones(4))),

    # 0-6hour-> -0.4, 7-12 hour -> -0.1, 13-19hour -> 0.4, 20-23hour->-0.4
    "Heater": np.asarray(
        list(-0.4 * np.ones(7)) + list(-0.1 * np.ones(6)) + list(0.4 * np.ones(7)) + list(-0.4 * np.ones(4))),

    # 0-6hour-> -0.1, 7-12 hour -> -0.5, 13-19hour -> -0.2, 20-23hour->-0.5
    "Television": np.asarray(
        list(-0.1 * np.ones(7)) + list(-0.5 * np.ones(6)) + list(-0.2 * np.ones(7)) + list(-0.5 * np.ones(4))),

    # no dissatisfaction means person good with any time. So using time where cost
    # of running appliance will surely be low :p
    "Default": np.asarray(
        list(-0.6 * np.ones(8)) + list(0.25 * np.ones(6)) + list(0.5 * np.ones(5)) + list(-0.6 * np.ones(5)))
}

    print('Request: ', request.get_json())
    content = request.get_json()

    appliance_to_schedule = []
    appliance_to_schedule_power = {}
    appliance_to_schedule_operating_hour = {}
    appliance_to_schedule_lower_time = {}
    appliance_to_schedule_upper_time = {}
    appliance_to_schedule_present_timing = {}

    for idx, each_appliance in enumerate(content['appliance info']):
        if each_appliance['appName'] in default_appliances:
            appliance_to_schedule.append(each_appliance['appName'])
        else:
            appliance_to_schedule.append("Default")

        if 'appWattage' in each_appliance and each_appliance['appWattage'] != "":
            appliance_to_schedule_power[appliance_to_schedule[idx]] = float(each_appliance['appWattage'])
        else:
            appliance_to_schedule_power[appliance_to_schedule[idx]] = default_rating[appliance_to_schedule[idx]]

        if 'totalRunningHours' in each_appliance and each_appliance['totalRunningHours'] != "":
            appliance_to_schedule_operating_hour[appliance_to_schedule[idx]] = int(each_appliance['totalRunningHours'])
        else:
            appliance_to_schedule_operating_hour[appliance_to_schedule[idx]] = default_operating_hours[
                appliance_to_schedule[idx]]

        if 'lowestStartingTime' in each_appliance and each_appliance['lowestStartingTime'] != "":
            appliance_to_schedule_lower_time[appliance_to_schedule[idx]] = float(each_appliance['lowestStartingTime'])
        else:
            appliance_to_schedule_lower_time[appliance_to_schedule[idx]] = default_lower_time[
                appliance_to_schedule[idx]]

        if 'highestStartingTime' in each_appliance and each_appliance['highestStartingTime'] != "":
            appliance_to_schedule_upper_time[appliance_to_schedule[idx]] = float(each_appliance['highestStartingTime'])
        else:
            appliance_to_schedule_upper_time[appliance_to_schedule[idx]] = default_upper_time[
                appliance_to_schedule[idx]]

        # Need to apply check for no preference.
        if 'prefTime' in each_appliance and each_appliance['prefTime'] != '':
            pref_timings = each_appliance['prefTime'].split(' - ')
            local_dissatisfaction[appliance_to_schedule[idx]][int(pref_timings[0]):int(pref_timings[1]) + 1] = -10000.0
        else:
            local_dissatisfaction[appliance_to_schedule[idx]][20:24] = -10000.0

        print('Appliance: ',appliance_to_schedule[idx],' local dissatisfaction array: ',local_dissatisfaction[appliance_to_schedule[idx]])

        # "present_schedule" is list of objects [k1:v1, k2:v1]
        # required field
        if 'presentTime' in each_appliance and each_appliance['presentTime'] != "":
            appliance_to_schedule_present_timing[appliance_to_schedule[idx]] = int(each_appliance['presentTime'])
        else:
            appliance_to_schedule_present_timing[appliance_to_schedule[idx]] = \
                default_present_timings[appliance_to_schedule[idx]]

    use_solar_power = True
    if 'solarPanelInfo' in content and content['solarPanelInfo'] != "":
        default_area = float(content['solarPanelInfo'])
    else:
        use_solar_power = False

    # one of winter_a_timing, winter_b_timing, summer_a_timing, summer_b_timing
    tariff_rate_policy = 'summer_a_timing'
    if 'timing_policy' in content and content['timing_policy'] != "":
        tariff_rate_policy = content['timing_policy']

    schedule, new_cost, hour_info, appliance_info = PSO(costFunction, local_dissatisfaction, appliance_to_schedule,
                                                        appliance_to_schedule_power,
                                                        appliance_to_schedule_operating_hour,
                                                        appliance_to_schedule_lower_time,
                                                        appliance_to_schedule_upper_time, use_solar_power,
                                                        tariff_rate_policy)

    for each_appliance in schedule:
        appliance_info[each_appliance]["Time"] = schedule[each_appliance]

    present_cost = calculate_present_cost(appliance_to_schedule, appliance_to_schedule_power,
                                          appliance_to_schedule_operating_hour, appliance_to_schedule_present_timing,
                                          tariff_rate_policy)

    # need to add date component
    result = {'schedule': schedule, 'old cost': round(present_cost, 2), 'new cost': round(new_cost, 2),
              'profit': round(present_cost - new_cost, 2), 'hourly info': hour_info, 'appliance info': appliance_info,
              'computedDate': time.strftime("%m/%d/%Y")}

    print(result)

    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)
