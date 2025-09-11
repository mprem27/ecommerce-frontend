import React from 'react'
import Title from '../Components/Title'
import { Assets } from '../assets/Assets'

const About = () => {
  return (
    <div className='p-1 '>
        <div className='text-center pt-8 border-t'>
          <Title mainTitle={'About'} SubHeading={'Us'}/>
        </div>
        <div className='my-10 flex flex-col item-center justify-center md:flex-row gap-16'>
          <img src={Assets.about} alt="About img" className='w-full h-[350px] mt-10 md:max-w-[600px] '/>
          <div className='flex flex-col justify-center gap-4 flex-gap-1 text-justify md:w1/2 text-gray-600'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam quidem voluptates ipsam aut mollitia saepe eligendi. Quia quis earum labore, incidunt necessitatibus reiciendis hic accusamus fuga suscipit consectetur molestias animi!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto nihil, ea ex sunt repellat ducimus hic cum neque, a dolorum temporibus aperiam! Quisquam, cum maxime quis nemo praesentium nam placeat.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum doloribus minus id tenetur suscipit eum explicabo molestias pariatur quibusdam dignissimos. Sequi earum, obcaecati voluptas asperiores amet libero quo unde laudantium.</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae qui tempore libero culpa ducimus minus natus placeat omnis, illum hic sequi earum, in ipsum sed asperiores nostrum doloribus magni unde.</p>

          </div>
        </div>
    </div>
  )
}

export default About